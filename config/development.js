config = {
	pwd: '123123',
	callback: {
		host: 'localhost',
		port: 3700,
		path: '/test',
		url: 'http://instagram-real-time.herokuapp.com/'
	},
	dropbox: {
		/* production */
		consumer_key : 'ner5ats5affj4m8',
		consumer_secret : 'iq4tsrrzlrtl4kh',
		oauth_token_secret: '7tll7oh8y0idqn8',
		oauth_token: '0i04jkdspwt6ukla',
		image_folder:{
			_4r: "4R Pre PS edit",
			half4r: "Half 4R Pre PS edit",
			wallet: "Wallet Pre PS edit"
		}
	},
	s3: {
		image_folder: 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/'
	},
	img: {
		captionText: 'instantly-mobile',
		belongTo: 'instantly-mobile'
	}
}
module.exports = config;