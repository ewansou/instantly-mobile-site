var LocalStrategy = require('passport-local').Strategy;
module.exports = function (app, passport) {

	
	
	app.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true}),
	    function(req, res) {
	        res.redirect('/photo-crop');
	    }
	);
	app.get('/photo-selection', ensureAuthenticated, function(req, res){
	  res.render('photoselection', { title: 'Photo Selection' });
	});

	app.get('/photo-print', ensureAuthenticated, function(req, res){
		var src = req.flash('src');
		res.render('photoprint', { title: 'Photo Print', src: src });
	});

	app.get('/photo-crop', ensureAuthenticated, function(req, res){
	  var src = req.flash('src'),
	  	  name = req.flash('name');
	  res.render('photocrop', { title: 'Photo Crop' , src: src, name: name  });
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