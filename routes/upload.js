

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
		var htParam = req.body,
		gm = require('gm').subClass({ imageMagick: true }),
		filePath = ['./public/upload/', req.body.name].join('');
		gm(filePath).crop(
			htParam.w, 
			htParam.h, 
			htParam.x1, 
			htParam.y1
		).resize(640,640).write(filePath, function(e){
			console.log(e);
		});
		req.flash('src', ['upload/', req.body.name].join(''));
		res.redirect('/photo-print');
	});

	

	app.post('/img_save_to_file', function(req, res){
		 var tempPath = req.files.img.path,
		 	gm = require('gm').subClass({ imageMagick: true }),
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
				
		        gm(targetPath).size(function (err, size) {

		        	if(!err) {
		        		console.log('width: '+size.width);
		        		console.log('height: '+size.height);
		        		res.send({
							"status":"success",
							"url":['upload/', filename].join(''),
							"height": size.height,
							"width": size.width

						});
		        	}

		        });
	            
	        });


		
	});
	app.post('/crop-02', function (req, res) {
		console.log(req.body);
		var htParam = req.body,
		gm = require('gm').subClass({ imageMagick: true }),
		filename = path.basename(htParam.imgUrl),
	    filePath = ['./public/upload/', filename].join(''),
	    targetPath = path.resolve(filePath);


		//filePath = ['./public/', htParam.imgUrl].join('');
		gm(targetPath).resize(htParam.imgW).crop(
			htParam.cropW, 
			htParam.cropW, 
			htParam.imgX1, 
			htParam.imgY1
		).resize(640,640).write(targetPath, function(e){

			req.flash('src', ['upload/', filename].join(''));

			var time = (new Date()).getTime();
			res.send({
				"status":"success",
				"url": htParam.imgUrl + '?v=' + time
			});
		});
		
	});


	app.post('/print', function (req, res) {
		var 
			htParam = req.body,
			filename = path.basename(htParam.src),
		    filePath = ['./public/upload/', filename].join(''),
		    targetPath = path.resolve(filePath);
		   
		console.log(htParam);
		console.log(targetPath);
		// 1.upload to dropbox
		//dropbox.upload(targetPath, htParam.type);

		// 2.upload to s3

		require('../routes/aws')(targetPath, function (err, data){
			if(err) {
				console.log(err);
			} else {
				// console.log(config);
				// console.log('uploaded successfully!');
				// console.log(data);
				// 3.notify to instagram-real-time site
				if (htParam.isAppear) {
					notify(filename);
				}
			}
		});
		
		// 4.at last, redirect to next step
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

	// function notify () {
		

	// 	var options = {
	// 			host: config.callback.host,
	// 			port: config.callback.port,
	// 			path: config.callback.path,
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Content-Length': Buffer.byteLength(data)
	// 		}
	// 	};
	// 	var http = require('http');

	// 	var req = http.request(options, function(res) {
	// 		res.setEncoding('utf8');
	// 		res.on('data', function (chunk) {
	// 			console.log("body: " + chunk);
	// 		});
	// 	});

	// 	req.write('data');
	// 	req.end();
	// }
}