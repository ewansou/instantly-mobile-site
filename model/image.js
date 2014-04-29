
var config = require('../config/development');
var mysql      = require('mysql');
(function () {

	module.exports = {
		insert : function (htParam) {
			var connection = mysql.createConnection(config.mysql);
			connection.connect();
			var sql    = [
						"INSERT INTO `image`(`id`, `username`, `caption`, `url`, `created_time`) ",
						"VALUES (NULL, '",
						 htParam.username || "","','",
						 htParam.caption || "", "','",
						 htParam.url,"',",
						 "NOW())"
			].join("");
			connection.query(sql, function(err, rows, fields) {
				if (err) {
					console.log(err);
				}

			});
			connection.end();
		}
	}

})(this);