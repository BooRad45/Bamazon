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

  var purchase =  function() {
  prompt.start ({
    properties: {
      productId: {
        message: 'What is the product ID?',
        required: true
      },
      howMany: {
        message: "How many would you like to purchase?",
        required: true
      }
    }
  });
}
 
  // 
  // Start the prompt

 
  // Get two properties from the user: email, password 
  // 
  prompt.get(purchase, function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Shopping activity:');
    console.log('  product ID: ' + result.productId);
    console.log('  Number purchased: ' + result.howMany);
  });


 
// connection.end();





