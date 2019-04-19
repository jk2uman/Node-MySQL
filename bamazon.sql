-- Bamazon Database --
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

-- Product Table --
 CREATE TABLE products(
    item_id Integer(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity Integer(11) NOT NULL,
    primary key(item_id)
    );
 Select * from products;

 Insert into products(product_name, department_name, price, stock_quantity)
 Values ('Beats Solo 3 Wireless On Ear', 'Electronics', 224.95, 25),
   ('Citizens Mens Stainless Steel Watch', 'Jewelry', 239.49 , 50),
   ('XBOX Live Gold 12 Month Membership', 'Video Games', 59.99, 200),
   ('Final Fantasy X/X-2 HD Remastered XBOX ONE', 'Video Games', 59.99, 150),
   ('Kama Surf Mens Trunks', 'Clothing', 18.99, 76),
   ('Nike Mens Basketball Shoes Black/Gold', 'Shoes', 129.95, 60),
   ('Everlast Heavy Bag Gloves', 'Sports', 12.74, 82),
   ('Cap Barbell 40 Pound Adjustable Dumbell Set', 'Sports', 49.99, 58),
   ('Dole Fruit Bowls Pineapples in Pineapple Juice', 'Grocery', 2.87, 622),
   ('Organic Valley Whole Milk Boxes 12 Pack', 'Grocery', 13.79, 76);
   
   