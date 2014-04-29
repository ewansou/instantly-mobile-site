var config = require('../config/development'),
	path = require('path'),
	DropboxClient = require('dropbox-node').DropboxClient;
dropbox = {
	upload : function (sFilePath, aImgTypes){

		if( typeof aImgTypes === 'string' ) {
		    aImgTypes = [ aImgTypes ];
		}

		aImgTypes.forEach( function (img_type) {

			var dropboxClient = new DropboxClient(config.dropbox.consumer_key, config.dropbox.consumer_secret, 
					config.dropbox.oauth_token, config.dropbox.oauth_token_secret);
					
			var dropboxPath = [config.dropbox.image_folder[img_type], path.basename(sFilePath)].join("/");

			dropboxClient.putFile(sFilePath, dropboxPath, function (err, data) {
				if(err) {
					console.log(err);
				}
				//console.log(data);
			});
		});
	}
}
module.exports = dropbox;