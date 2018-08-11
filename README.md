# Bamazon

## App Description

This app is an Amazon-like storefront, which will take in orders from customers and deplete stock from the store's inventory. 

The application receives customers' input using the [inquirer](https://www.npmjs.com/package/inquirer) package and store the data in the MySQL database using [mysql](https://www.npmjs.com/package/mysql) package. There are **customer** and **manager** views.

### Customer View

The customer view displays the existing inventory with 10 different products in a table with 5 columns: item ID, product name, department in which the product is located, stock quantity, and price $. Once the app is running, it prompts users with 2 messages: asking the item ID and the quantity they would like to buy. Then the app checks if the store has enough of the product to meet the user's request. If not, the app logs a phrase like **Insufficient quantity! Please select another item.** If user's request is in stock, the app fulfills the user's order, shows the user the total cost of their purchase, and updates the SQL database to reflect the remaining quantity. 

How to run Customer View js file:

	open Git Bash Terminal and go to your Downloads directory to clone my GitHub Repository
	git clone git@github.com:ekhin/Bamazon.git
	cd ~/downloads/bamazon
	open bamazonCustomer.js and add MySQL Password to connect to Database
	npm install
	node bamazonCustomer.js

See Customer View Demo via GIF below:
![customer-view](https://github.com/ekhin/Bamazon/blob/master/customer-view.gif)

### Manager View

The manager view displays a list of five menu options: 

	? What would you like to do? (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  Quit
	  
If a manager selects **View Products for Sale**, the app will list every available item: the item IDs, product names, departments in which the items are located, prices, and stock quantitities. 

If a manager selects **View Low Inventory**, the app will list all items with an inventory count lower than five.

If a manager selects **Add to Inventory**, the app will display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects **Add New Product**, the app will allow the manager to add a completely new product to the store.

How to run Manager View js file:

	cd ~/downloads/bamazon
	open bamazonManager.js file and add MySQL Password to connect to Database
	node bamazonManager.js

See Manager View Demo via GIF below:
![manager-view](https://github.com/ekhin/Bamazon/blob/master/manager-view.gif)

### Bamazon Demos

If the GIFs for both customer and manager views are small to watch, you can download and watch them in the full screen at the links below. 

[Customer View Demo](https://drive.google.com/file/d/1bpHXeWxYrmWorxoSTaTTsIXouWqf7eGP/view?usp=sharing)
[Manager View Demo](https://drive.google.com/file/d/1MOszdsOjOEGt55eD7rRVvjiD1R-Lwokw/view?usp=sharing)


