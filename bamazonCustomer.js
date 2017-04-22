 var mysql = require('mysql'); //node.js driver for mysql
 var inquirer = require('inquirer');

 var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'root',
     database: 'Bamazon'
 });



 // connect to the sql database 'Bamazon' to fetch product information
 connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as id " + connection.threadId);
     runSearch();
 });

 var runSearch = function() {
     inquirer.prompt([{
         name: "SeeProducts",
         type: "confirm",
         message: "Would you like to see our inventory at Bamazon? Type 'Y' for yes",
         default: false

     }]).then(function(answer) {

         if (answer === "Y" || "y" || "yes" || "Yes" || "YES") {
             connection.query('SELECT * FROM products', function(err, res) {
                 if (err) throw err;
                 for (var i = 0; i < res.length; i++) {
                     console.log("ID: " + res[i].tem_id + "\nProduct: " + res[i].product_name + "\nPrice: $" + res[i].price + "\n\n");
                     
                 }
                 productSearch();
             });
         }


     });
 };


 var productSearch = function() {
     inquirer.prompt([{
         name: "productId",
         type: "input",
         message: "What product would you like to buy (use ID#)?",
         validate: function(value) {
             if (isNaN(value) === false) {
                 return true;
             }
             return false;
         }
     }, {
         name: "numberOf",
         type: "input",
         message: "How many would you like to purchase?",
         validate: function(value) {
             if (isNaN(value) === false) {
                 return true;
             }
             return false;
         }
     }]).then(function(answer) {
         var query = "SELECT product_name FROM products WHERE ?";
         connection.query(query, { tem_id: answer.productId }, function(err, res) {
             console.log(res);
             for (var i = 0; i < res.length; i++) {
                 console.log("Product: " + res[i].product_name);
                 console.log("Number of units requested: " + answer.numberOf);
                 if (res[i].stock_quantity < answer.numberOf) {
                     console.log("Insufficient quantity! Please try again");
                     productSearch();
                 } else {
                     var updateStock = parseInt(res[i].stock_quantity - answer.numberOf);
                     console.log("stock quantity: " + res[i].stock_quantity);
                     console.log("answer.number of: " + answer.numberOf);
                     var totalCost = parseFloat(answer.numberOf * res[i].price);
                     console.log("Total Cost: " + totalCost);
                     connection.query('UPDATE products SET stock_quantity = ? WHERE tem_id = ?', ['updateStock', answer.productId], function(error, results, fields) {
                         if (error) throw error;
                         
                     });
                 }
             }
         });
     });
 };





 // connection.query('SELECT * FROM products', function (err, res) {
 //   if (err) throw err;
 //   for (var i = 0; i < res.length; i++) {
 //   console.log("ID: " + res[i].tem_id + "\nProduct: " + res[i].product_name + "\nPrice: $" + res[i].price + "\n\n");  
 //     }
 //   });
