
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');
AWS.config.update({region: 'ap-southeast-1'});
var fs = require('fs'),
	path = require('path');

module.exports = function(filePath, callback) {
	var 
		filename = path.basename(filePath),
		bucketName = 'mobile-instantly';

	var s3 = new AWS.S3();

	fs.readFile( filePath, function(err, data){

		 if (err) { 
		 	console.warn(err); 
		 }
		 else {

		 	var params = {
		 		Bucket: bucketName, 
		 		Key: filename, 
		 		Body: data, 
		 		ACL: 'public-read',
		 		ContentType: 'image/*'
		 	};

		 	s3.putObject(params, callback);
		 }
	});
}