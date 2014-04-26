var config = require("../config/development");
var mysql      = require('mysql');
user = {id}
admin = function () {

}
admin.prototype.findById = function (id, callback) {

	var connection = mysql.createConnection(config.mysql);
	
	connection.connect();

	var sql = [
			'SELECT a.id, a.admin, a.pwd',
			'FROM admin AS a',
			'WHERE a.id =',
			id
		].join(' ');
	connection.query(sql, function (err, users, fields) {
		if(err) {
			 callback(new Error('User ' + id + ' does not exist'));
		} else {
			callback(null, users[0]);
		}
	});

	connection.end();
};

admin.prototype.findByUsername = function (username, callback) {
	
	var connection = mysql.createConnection(config.mysql);
	
	connection.connect();

	var sql = [
			'SELECT a.id, a.admin, a.pwd',
			'FROM admin AS a',
			'WHERE a.admin = "' + username + '"'
		].join(' ');
	connection.query(sql, function (err, users, fields) {
		if(users && users.length) {
			callback(null, users[0]);
		} else {
			callback(err, null);
		}
		
	});

	connection.end();
};
module.exports = admin;
