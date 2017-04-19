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
 
connection.query('SELECT * FROM products', function (err, res) {
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
  console.log("ID: " + res[i].tem_id + "\nProduct: " + res[i].product_name + "\nPrice: $" + res[i].price + "\n\n");
  }
});
 
// connection.end();



// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });

