

var path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    mv = require('mv'),
    config = require('../config/development'),
    dropbox = require('../model/dropbox');
function generateFileName (tempPath){
	var filename = path.basename(tempPath).substring(1, 7).replace('-','_');
	console.log(filename);
	return [config.pwd, 'mob', filename + path.extname(tempPath)].join('-');
}

function getFinalName (fileName, isAppear) {
	var additional = isAppear === 'true' ? 'yes' : 'no';
	return [path.basename(fileName, path.extname(fileName)), 
	'-', additional, path.extname(fileName)].join('');
}
module.exports = function (app) {

	app.post('/upload', function (req, res) {
	    var tempPath = req.files.file.path,
	    	filename = generateFileName(tempPath);
	    	filePath = ['./public/upload/', filename].join(''),
	        targetPath = path.resolve(filePath);
	        //targetPath = path.resolve('./public/upload/image.png'),
	        //filename = path.basename(targetPath);
	        mv(tempPath, targetPath, function(err) {
	            if (err) {
	            	throw err;
	            }
	            gm = require('gm').subClass({ imageMagick: true });
	            //gm(targetPath).autoOrient();
	            console.log(filePath);
	            gm(targetPath).autoOrient().write(targetPath, function () {
	            	 // console.log("Upload completed!");
		            fs.unlink(tempPath, function () {
			            if (err) throw err;
			        });
			        req.flash('src', ['upload/', filename].join(''));
			        req.flash('name', filename);
			        
		            res.redirect('/photo-crop');
	            });
	           
	        });
	});

	app.post('/crop', function (req, res) {
		var htParam = req.body;
		// console.log(htParam)
		gm = require('gm').subClass({ imageMagick: true }),
		filePath = ['./public/upload/', req.body.name].join('');
		gm(filePath).crop(
			htParam.w, 
			htParam.h, 
			htParam.x, 
			htParam.y
		).resize(640,640).write(filePath, function(e){
			// console.log(e);
			var time = (new Date()).getTime();
			req.flash('src', ['upload/', req.body.name, '?v=', time].join(''));
			req.flash('name', req.body.name);
			res.redirect('/photo-print');
		});
		
	});

	

	app.post('/print', function (req, res) {
		var 
			htParam = req.body,
			filename = getFinalName(htParam.name, htParam.isAppear),
			oldPath = ['./public/upload/', htParam.name].join('')
		    filePath = ['./public/upload/', filename].join(''),
		    targetPath = path.resolve(filePath);
		console.log(filename);
		fs.renameSync(oldPath, filePath);
		// console.log(htParam);
		// console.log(targetPath);
		// 1.upload to dropbox
		dropbox.upload(targetPath, htParam.type);

		// 2.upload to s3

		require('../routes/aws')(targetPath, function (err, data){
			if(err) {
				// console.log(err);
			} else {
				// console.log(config);
				// console.log('uploaded successfully!');
				// console.log(data);
				// 3.notify to instagram-real-time site
				//if (htParam.isAppear === 'true') {
					// console.log(htParam.isAppear)
					//notify(filename);
				//}

				//4. save into db
				var imgModel = require('../model/image');
				var insertData = {
					username: config.img.captionText,
					caption: config.img.belongTo,
					url: [config.s3.image_folder, filename].join(''),
					isShowed: htParam.isAppear === 'true' ? 1 : 0
				};

				imgModel.insert(insertData, function(err, rows, fields) {
					if (err) {
						console.log(err);
					}
				});
			}
		});
		// 5.at last, redirect to next step
		res.redirect('/print-progress');

		
	});

	function notify (filename) {
		var rest = require('restler');
		var querystring = require('querystring');

		var postData = {
			    data : [
			      {
			        images: {
			          standard_resolution: {
			            url: [config.s3.image_folder, filename].join('')
			          }
			        },
			        caption: {
			          text: config.img.captionText
			        },
			        created_time: '1000021',
			        user: {
			          username: config.img.belongTo
			        }
			      }
			    ]
		  }
		rest.post(config.callback.url, {
		  data: postData,
		  'Content-Type': 'application/json'
		}).on('complete', function(data, response) {
			console.log('completed!');
		});
	}

	
}