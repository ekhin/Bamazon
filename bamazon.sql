DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Coffee Maker', 'Kitchen Appliance', 59.99, 300),
		('Sunscreen', 'Health & Beauty', 12.99, 200),
		('Shampoo', 'Bath & Body', 6.75, 500),
		('Conditioner', 'Bath & Body', 5.99, 627),
		('Mattress', 'Furniture', 299.99, 100),
		('Desk Lamp', 'Furniture', 36.99, 150),
		('Laptop', 'Electronics', 899.99, 250),
		('Balloons', 'Party Supplies', 4.99, 275),
		('Diaper', 'Baby & Toddler', 39.99, 175),
		('Star Wars: Episode VIII', 'Movies & Music', 14.99, 66);

SELECT * FROM products;