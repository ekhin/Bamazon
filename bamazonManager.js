var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');
var totalProducts = 0;
    
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

function managerView() {
    connection.query("SELECT COUNT(*) as totalProducts FROM products", function(get_err, get_res) {
        totalProducts = get_res[0].totalProducts;
    });
	inquirer.prompt([
		{
			type: "list",
			name: "menu",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
	]).then(function(answer) {
        
		switch(answer.menu) {
            case "View Products for Sale": 
                viewSale();
                break;
            case "View Low Inventory":
                viewInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Quit":
                console.log("GoodBye!");
                connection.end();
				process.exit();
        }
	});
}

function viewSale() {
		connection.query("SELECT * FROM Products", function(err, res) {
        if(err) throw err;
		console.log("\nViewing Products for Sale:"); 
        var items = [];
		for (var i = 0; i < res.length; i++) {
            items.push({
               "Item\ ID:" : res[i].item_id,
				"Product\ Name:" : res[i].product_name,
				"Department:" : res[i].department_name,
				"Stock\ Quantity:" : res[i].stock_quantity,
				"Price: $" : res[i].price
			});
		}
	  	console.table(items);
        managerView();
	})
}

function viewInventory() {
	var query = "SELECT * FROM products WHERE stock_quantity < 5";
	connection.query(query, function(err, data) {
		if (err) throw err;
		console.log("\nViewing Low Inventory (Stock Quantity below 5): \n");
	
     var lowInventory = [];
		for (var i = 0; i < data.length; i++) {
            lowInventory.push({
               "Item\ ID:" : data[i].item_id,
				"Product\ Name:" : data[i].product_name,
				"Department:" : data[i].department_name,
				"Stock\ Quantity:" : data[i].stock_quantity,
				"Price: $" : data[i].price
			});
		}

	  	console.table(lowInventory);
        managerView();
	})
}

function addInventory() {
    console.log("Adding items to Inventory:");
    inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "What is the ID of the item you would like to add? [Quit with Q]",
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
			message: "How many would you like to add? [Quit with Q]",
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
				//Update the inventory	
            connection.query("UPDATE products SET ? WHERE ?", 
            [ 
                { 
                    stock_quantity: (get_res[0].stock_quantity + parseInt(answer.quantity))
                }, 
                { 
                    item_id: answer.item_id
                }
            ], function(err, update_res) {
                if (err) throw err;
                console.log("\nSuccessfully restocked " + answer.quantity + " "+ get_res[0].product_name + "'s!!!\n");
                console.log("\n---------------------------------------------------------------------");
                managerView();
            });
				
		});
	});
}

function addNewProduct() {
    console.log("Adding New Product:");
	inquirer.prompt([
		{
			type: "input",
			name: "product",
			message: "What is the new product name?",
		},
		{
			type: "input",
			name: "department",
			message: "What is the new product's department?",
		},
		{
			type: "input",
			name: "price",
			message: "What is the price per unit?",
			validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;	
		        }
        },
		{
			type: "input",
			name: "quantity",
			message: "How many units are you adding to inventory?",
			validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;	
		    }
        }
	]).then(function(ans) {
		connection.query("INSERT INTO products SET ?",
        {
            product_name: ans.product,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity
        }, function (err, res) {
			if(err) throw err;
			console.log("Successfully added new product under Item ID " + res.insertId + ".");
			console.log("\n---------------------------------------------------------------------");
            managerView();
        });
    });
}
managerView();