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

 //////////////INQUIRER ASKS IF USER WOULD LIKE TO SEE PRODUCTS IN STOCK///////////////
 //////////////HACKY FIX TO KEEP INQUIRER QUESTION FROM APPEARING BEFORE PRODUCT LIST///////
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
                     ////////ABOVE IS LIST OF PRODUCTS, ID'S, PRICES IN STOCK////////////
                 }
                 productSearch(); ////CALL PRODUCT SEARCH SO USER CAN SHOP ON BAMAZON
             });
         }


     });
 };

 ////////INQUIRER ASKS TWO QUESTIONS OF USER (PRODUCT ID????   &&&&    HOW MANY???)/////////////
 var productSearch = function() {
     inquirer.prompt([{
         name: "productId",
         type: "input",
         message: "What product would you like to buy (use ID#)?",
         validate: function(value) { ////////VALIDATING TO SEE IF THEY PICKED A NUMBER/////////////
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
     }]).then(function(answer) { ///////////BEGIN SQL QUERY TO CHECK IF ENOUGH IN STOCK///////////
         var query = "SELECT * FROM products WHERE ?;" //select column stock quantity from table products where product id by user matches id in table products
         connection.query(query, { tem_id: answer.productId }, function(err, res) {
             // console.log(answer.numberOf); //log user answer for number of units desired
             // console.log(res[0].stock_quantity); //log current stock quantity 
             if (res[0].stock_quantity < answer.numberOf) {
                 console.log("Insufficient quantity! Please try again");
                 productSearch();
             } else {
                 var adjustedStock = res[0].stock_quantity - answer.numberOf;
                 var name = res[0].product_name;
                 console.log("Remaining stock: " + adjustedStock);
                 var totalCost = ("$" + parseFloat(answer.numberOf * res[0].price));
                 var queryUpdate = "UPDATE products SET stock_quantity = " + mysql.escape(parseInt(adjustedStock)) + " WHERE tem_id = " + mysql.escape(parseInt(answer.productId)); //use mysql escape method directly
                 connection.query(queryUpdate, function(err, res) {
                     // console.log("Results of update Query: " + res);
                     console.log("You Purchased: " + answer.numberOf + " " + name + "'s");
                     console.log("Your total cost is: " + totalCost);
                     productSearch();
                 });
             }
         });
     });
 };




 //                 
 //                         var totalCost = parseInt(answer.numberOf * res[i].price);
 //                         console.log("Total Cost: " + totalCost);
 //                         connection.query('UPDATE products SET stock_quantity = ? WHERE tem_id = ?', ['updateStock', answer.productId], function(error, results, fields) {
 //                             if (error) throw error;






 // connection.query('SELECT * FROM products', function (err, res) {
 //   if (err) throw err;
 //   for (var i = 0; i < res.length; i++) {
 //   console.log("ID: " + res[i].tem_id + "\nProduct: " + res[i].product_name + "\nPrice: $" + res[i].price + "\n\n");  
 //     }
 //   });
