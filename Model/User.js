var db = require('../Dbconnection');

var User = {
	checkExist: function(username, callback) {
		return db.query("Select * from Users Where username=?", [username], callback);
	},
    logIn: function(username, callback) {
		return db.query("Select * from Users Where username=? And pwd=?", [username,password], callback);
	},
    getAllUsers: function(callback) {
        return db.query("Select * from Users", callback);
    },
	createUser: function(user,callback) {
		return db.query("Insert into Users(username,pwd) values(?,?)", [user.username, user.pwd], callback);
	}
};
module.exports = User;
