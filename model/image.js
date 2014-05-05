
var config = require('../config/development');
var mysql      = require('mysql');
(function () {

	module.exports = {
		insert : function (htParam, callback) {
			var connection = mysql.createConnection(config.mysql);
			connection.connect();
			var sql    = [
						"INSERT INTO `image`(`id`, `username`, `caption`, `url`, `isShowed`, `created_time`) ",
						"VALUES (NULL, '",
						 htParam.username || "","','",
						 htParam.caption || "", "','",
						 htParam.url,"','",
						 htParam.isShowed,"',",
						 "NOW())"
			].join("");
			connection.query(sql, callback);
			connection.end();
		},

		getImages : function (limit, offset, callback) {
			var connection = mysql.createConnection(config.mysql);
			connection.connect();
			var sql    = [
						"SELECT id, username, caption, url, UNIX_TIMESTAMP(created_time) AS timecreated ",
						"FROM image ",
						"WHERE isShowed = 1 ",
						"order by created_time DESC LIMIT ",
						limit,
						" OFFSET ",
						offset
			].join("");
			console.log(sql);
			connection.query(sql, callback);
			connection.end();
		}
	}

})(this);