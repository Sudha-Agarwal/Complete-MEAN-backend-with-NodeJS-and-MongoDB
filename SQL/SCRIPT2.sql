
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255),
    unit_price DECIMAL(10, 2) -- Adjust as needed
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers (customer_id, customer_name) VALUES
    (1, 'John Doe'),
    (2, 'Jane Smith'),
    (3, 'Bob Johnson');
 INSERT INTO customers (customer_id, customer_name) VALUES
   (4, 'Bob Johnson1');   
    
INSERT INTO orders (order_id, customer_id, order_date) VALUES
    (101, 1, '2023-01-15'),
    (102, 2, '2023-02-20'),
    (103, 3, '2023-03-25');

-- Inserting sample data into the products table
INSERT INTO products (product_id, product_name, unit_price) VALUES
    (1, 'Laptop', 999.99),
    (2, 'Smartphone', 499.99),
    (3, 'Headphones', 79.99);
    
INSERT INTO order_items (order_id, product_id, quantity) VALUES
    (101, 1, 2), -- John Doe ordered 2 laptops
    (102, 2, 3), -- Jane Smith ordered 3 smartphones
    (103, 3, 1), -- Bob Johnson ordered 1 pair of headphones
    (103, 2, 1); -- Bob Johnson ordered 1 smartphone
    
-- RETRIEVE INFORMATION ABOUT WHICH CUSTOMER ORDERED WHICH PRODUCT AND THE QUANTITY
SELECT 
	C.CUSTOMER_NAME,
    C.CUSTOMER_ID,
    O.ORDER_ID,
    P.PRODUCT_NAME,
    P.UNIT_PRICE,
    OI.QUANTITY
FROM 
	CUSTOMERS AS C
INNER JOIN 
	ORDERS AS O ON C.CUSTOMER_ID= O.CUSTOMER_ID
INNER JOIN
	ORDER_ITEMS AS OI ON O.ORDER_ID = OI.ORDER_ID
INNER JOIN 
	PRODUCTS AS P ON OI.PRODUCT_ID = P.PRODUCT_ID;

-- JOIN to retrieve id and name of customers whose total bill amount is more than 1500.
SELECT 
	C.CUSTOMER_NAME,
    C.CUSTOMER_ID,
    SUM(P.UNIT_PRICE * OI.QUANTITY) AS TOTAL_BILL_AMOUNT
FROM 
	CUSTOMERS AS C
INNER JOIN 
	ORDERS AS O ON C.CUSTOMER_ID= O.CUSTOMER_ID
INNER JOIN
	ORDER_ITEMS AS OI ON O.ORDER_ID = OI.ORDER_ID
INNER JOIN 
	PRODUCTS AS P ON OI.PRODUCT_ID = P.PRODUCT_ID
GROUP BY
	C.CUSTOMER_ID
HAVING TOTAL_BILL_AMOUNT > 1000
ORDER BY TOTAL_BILL_AMOUNT DESC;


