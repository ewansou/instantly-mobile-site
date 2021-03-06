
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var http = require('http');
var path = require('path')
  , passport = require('passport'),
  flash = require('connect-flash'),
  config = require('./config/development');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon(__dirname + '/public/img/favicon.ico')); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(require('connect-multiparty')());
app.use(express.methodOverride());
app.use( express.cookieParser() );
app.use(express.session({ secret: 'instantlymobilesessionsecretkey', cookie:{maxAge: config.maxAge} })); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./config/passport')(passport);
require('./routes/auth')(app, passport);
require('./routes/upload')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


