
/*
 * GET home page.
 */
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

	
}
