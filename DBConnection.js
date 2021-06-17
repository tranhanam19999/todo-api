var mysql=require('mysql');
var connection=mysql.createPool({

host:'localhost',
    user:'root',
    password:'abc123',
    database:'EntranceTestDB'
});
module.exports=connection;
