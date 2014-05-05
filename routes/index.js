
/*
 * GET home page.
 */
var imgModel = require('../model/image');
module.exports = function (app) {

	app.get('/', function(req, res){
		var obj = req.flash();
		if(obj['error']){
			res.render('index', { title: 'instantly', message: obj['error']});
		}
		else {
			res.render('index', { title: 'instantly'});
		}
	  	
	});
	app.get('/how-it-work', function(req, res){
	  res.render('howitwork', { title: 'How It Work' });
	});

	app.get('/recent/:limit', function (req, res) {
		limit = req.params.limit;
		// res.send([{
		    // link: "",
		    // user: {
		    //   username: "test"
		    // },
		    // created_time: "1399183626",
		    // images: {
		    //   standard_resolution: {
		    //     url: "http:\/\/mobile-instantly.s3-website-ap-southeast-1.amazonaws.com\/7892-14jlo31.png"
		    //   }
		    // },
		    // caption: {
		    //   text: "from instantly with love"
		    // }
	 //  	}]);
	imgModel.getImages(limit, 0, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		var x = rows.map(function (row) {
			return {
				    link: "",
				    user: {
				      username: row.username
				    },
				    created_time: row.timecreated,
				    images: {
				      standard_resolution: {
				        url: row.url
				      }
				    },
				    caption: {
				      text: row.caption
				    }
				};
		});
		res.send(x);
	});
	});
	
}
