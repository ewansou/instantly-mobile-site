

var path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    mv = require('mv'),
    config = require('../config/development'),
    dropbox = require('../model/dropbox');

module.exports = function (app) {

	app.post('/upload', function (req, res) {
	    var tempPath = req.files.file.path,
	    	filename = path.basename(tempPath),
	    	filePath = ['./public/upload/', filename].join(''),
	        targetPath = path.resolve(filePath);
	        //targetPath = path.resolve('./public/upload/image.png'),
	        filename = path.basename(targetPath);
	        mv(tempPath, targetPath, function(err) {
	            if (err) {
	            	throw err;
	            }
	            console.log("Upload completed!");
	            fs.unlink(tempPath, function () {
		            if (err) throw err;
		        });
		        req.flash('src', ['upload/', filename].join(''));
		        req.flash('name', filename);
		        
	            res.redirect('/photo-crop');
	        });
	});

	app.post('/crop', function (req, res) {
		var htParam = req.body;
		console.log(htParam)
		gm = require('gm').subClass({ imageMagick: true }),
		filePath = ['./public/upload/', req.body.name].join('');
		gm(filePath).crop(
			htParam.w, 
			htParam.h, 
			htParam.x, 
			htParam.y
		).resize(640,640).write(filePath, function(e){
			console.log(e);
			var time = (new Date()).getTime();
			req.flash('src', ['upload/', req.body.name, '?v=', time].join(''));
			req.flash('name', req.body.name);
			res.redirect('/photo-print');
		});
		
	});

	

	app.post('/print', function (req, res) {
		var 
			htParam = req.body,
			filename = htParam.name,
		    filePath = ['./public/upload/', filename].join(''),
		    targetPath = path.resolve(filePath);
		   
		console.log(htParam);
		console.log(targetPath);
		// 1.upload to dropbox
		dropbox.upload(targetPath, htParam.type);

		// 2.upload to s3

		require('../routes/aws')(targetPath, function (err, data){
			if(err) {
				console.log(err);
			} else {
				// console.log(config);
				// console.log('uploaded successfully!');
				// console.log(data);
				// 3.notify to instagram-real-time site
				if (htParam.isAppear === 'true') {
					console.log(htParam.isAppear)
					notify(filename);
				}

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