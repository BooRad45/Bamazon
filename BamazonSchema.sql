CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
tem_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(55),
department_name VARCHAR(55),
price DECIMAL(10,2),
stock_quantity INT
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laser Pen", "Electronics", 15.75, 4), ("Mighty Putty", "Hardware", 10.00, 10), ("Flow Bee", "Beauty", 14.99, 2), ("OxiClean", "Home", 9.50, 1), ("OrangeGlo", "Home", 6.75, 4), ("Dual Saw", "Hardware", 14.25, 0), ("Smokeless Ashtray", "Health", 12.99, 2), ("Pocket Fisherman", "Sporting Goods", 24.00, 7), ("Inside-the-shell Egg Scrambler", "Kitchen", 21.00, 5), ("Electric Food Dehydrator", "Kitchen", 19.99, 17)
