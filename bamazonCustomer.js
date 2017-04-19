 var mysql = require('mysql');
 var prompt = require('prompt');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'root',
  database : 'Bamazon'
});
 
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
});
 
connection.query('', function (error, results, fields) {
  if (error) throw error;
  console.log(' ', results);
});
 
// connection.end();



// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });

