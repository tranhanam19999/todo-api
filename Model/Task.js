var db = require('../Dbconnection');

var Task = {
    getAllTasks: function(callback) {
		return db.query("Select * from Tasks", callback);
	},
	getTaskById: function(id,callback) {
		return db.query("select * from Tasks where id=?", [id], callback);
	},
	createTask: function(task,callback) {
		return db.query("Insert into Tasks(taskName,taskDescription,userId,expireDate, taskStatus, createdTime, updatedTime) values(?,?,?)",
                        [
                            task.taskName, task.taskDescription, task.userId, task.expireDate,
                            task.taskStatus, task.createdTime, task.updatedTime
                        ],
                        callback);
	},
	removeTask: function(id,callback){
		return db.query("delete from Tasks where id=?", [id], callback);
	},
	updateTask:function(task,callback){
		return db.query("update Tasks set taskName=?,taskDescription=?,userId=?,expireDate=?,createdTime=?,updatedTime=? where Id=?",
                        [
                            task.taskName, task.taskDescription, task.userId, task.expireDate,
                            task.createdTime, task.updatedTime, task.id
                        ],
                        callback);
	}
};
 module.exports = Task;
