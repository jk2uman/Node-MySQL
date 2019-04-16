var mysql = require ('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    //Your username
    user: "webuser",
    //Your password
    password: "secretPassword",
    database: 'bamazon',
});
//then create a call back function to confirm if connection was successful
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log ("connected as id" + connection.threadid)
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        for (var i=0; i<res.length; i++) {
        console.log("Available for sale - " + ("Item ID: " + res[i].item_id + "," + " Product: " 
        + res[i].product_name + "," + " $" + res[i].price));
        //console.log(res[0].item_id);
        }
        start(res);
    });
});

function start (results) { 

    inquirer.prompt([
        {
            // type is limited to "input" or other specific commands (input, confirm, list, rawlist, etc..).  Name field is freeform.
            type: "list",
            name: "selectItemID",
            message: "What is the Item ID of the product you would like to buy?",
            choices: function() {
                var choiceArrayItemId = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArrayItemId.push(results[i].item_id.toString());
                }
                return choiceArrayItemId;
            }
        },
        {
            type: "input",
            name: "selectNumUnits",
            message: "How many would you like to buy?"
        }

    ])
    
    .then (function(answer){
        CheckUnits(answer.selectItemID, answer.selectNumUnits);
    });     
};

// Once the customer has placed the order, application should check if your store has enough 
// of the product to meet the customer's request.
// If not, the app should log a phrase like 'Insufficient quantity!' 
//and then prevent the order from going through.

// code to update number of units in db
function updateUnits(itemID, NumUnits, stock_quantity){
    console.log(" Updating units".cyan);
    var query = connection.query(
        `UPDATE products SET stock_quantity = ${stock_quantity-NumUnits} WHERE ${itemID} = item_id`, function(err, results){
            if (err){
                throw err;
            }
            console.log("Your order has been placed successfully!".bold);
        }
    )
}

function CheckUnits(ItemID, NumUnits){


  // query the database for the unit count of items being sold
  connection.query(`SELECT stock_quantity FROM products WHERE ${ItemID} = products.item_id`, function(err, results) {
    //   console.log(results);
    //   console.log(results[0].stock_quantity);
    //   console.log(NumUnits);
    if (err){
        throw err;
    }
    else if (parseInt(NumUnits)> results[0].stock_quantity) {

        console.log ("Insufficient quantity - cannot complete your order.")
        start();
        }

// if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

    else if (parseInt(NumUnits) <= results[0].stock_quantity) {

    // once you have the items, prompt the user for which they'd like to bid on
    updateUnits(ItemID, NumUnits, results[0].stock_quantity);
    connection.end();
    };
    })
}

