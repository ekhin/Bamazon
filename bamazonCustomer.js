var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

function displayItems() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		console.log('\nExisting Inventory: ');
		
		var items = [];
		for(var i =0; i < res.length; i++){
			items.push({
				"Item\ ID:" : res[i].item_id,
				"Product\ Name:" : res[i].product_name,
				"Department:" : res[i].department_name,
				"Stock\ Quantity:" : res[i].stock_quantity,
				"Price: $" : res[i].price
			});
		}
		
		console.table(items);
	  	userRequest(items.length);
	})
}

function userRequest(totalProducts) {
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "What is the ID of the item you would like to purchase? [Quit with Q]",
			validate: function(value) {
				if(value.toLowerCase() === 'q'){
					console.log("\nGoodBye!\n");
					connection.end();
					process.exit();
					return;
				
				}else if (isNaN(value) === false) {
                	if(parseInt(value) <= 0 || parseInt(value) > totalProducts){
                		console.log("\nPlease select a valid Item ID displayed above.");
                		return false;
                	}
                return true;
                }
                return false;
                }			
		},
		{
			type: 'input',
			name: 'quantity',
			message: "How many would you like to buy? [Quit with Q]",
			validate: function(value) {
				if(value.toLowerCase() === 'q'){
					console.log("\nGoodBye!");
					connection.end();
					process.exit();
					return;

                }else if (isNaN(value) === false) {
                return true;
                }
                return false;
                }
		}
	]).then(function(answer) {
		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, { item_id: answer.item_id }, function(get_err, get_res) {

				if (answer.quantity <= get_res[0].stock_quantity) {
				//Update the inventory										
					connection.query("UPDATE products SET ? WHERE ?", 
					[ 
						{ 
							stock_quantity: (get_res[0].stock_quantity - answer.quantity)
						}, 
						{ 
							item_id: answer.item_id
						}
					], function(err, update_res) {
						if (err) throw err;
						var totalPrice = parseFloat(get_res[0].price * answer.quantity).toFixed(2);
						console.log("\nSuccessfully purchased " + answer.quantity + " " + get_res[0].product_name + "'s! " + "Your total cost is $" + totalPrice + ".");
						console.log('Thank you for shopping with us!');
					})
				} else {
					console.log("Insufficient quantity! Please select another item.");
				}
				displayItems();
		});
	})
}
displayItems();