var LocalStrategy = require('passport-local').Strategy;
module.exports = function (app, passport) {

	
	app.get('/', function(req, res){
		if ( req.isAuthenticated() ) { 
			res.redirect('/photo-selection');
		}
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
	app.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true}),
	    function(req, res) {
	        res.redirect('/photo-selection');
	    }
	);
	app.get('/photo-selection', ensureAuthenticated, function(req, res){
	  res.render('photoselection', { title: 'Photo Selection' });
	});

	app.get('/photo-print', ensureAuthenticated, function(req, res){
		var src = req.flash('src'),
			name = req.flash('name'),
			oldsrc = req.flash('oldsrc'),
			oldname = req.flash('oldname');
		if (!src || !src.length) {
		  	res.redirect('/photo-selection');
	    } 
		res.render('photoprint', { title: 'Photo Print', src: src, name: name, oldsrc: oldsrc, oldname: oldname});
	});

	app.get('/photo-crop', ensureAuthenticated, function(req, res){
	  var src = req.flash('src'),
	  	  name = req.flash('name');
	  console.log(src);
	  if (!src || !src.length) {
	  	res.redirect('/photo-selection');
	  } 
	  else {
		  res.render('photocrop', { title: 'Photo Crop' , src: src, name: name  });
	  }
	});

	app.get('/print-progress', ensureAuthenticated, function(req, res) {
		res.render('printprogress', {title: 'Print Progress'});
	});


};
function ensureAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) { 
        return next(); 
    } else {
        res.redirect('/');
    }
}