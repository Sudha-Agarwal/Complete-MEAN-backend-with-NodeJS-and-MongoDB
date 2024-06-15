drop table Department, Employee, Project, Manager;

-- Create the Department table
CREATE TABLE Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Create the Employee table
CREATE TABLE Employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    hire_date DATE NOT NULL,
    job_title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

-- Create the Project table
CREATE TABLE Project (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

-- Create the Manager table
CREATE TABLE Manager (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT UNIQUE,
    project_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);


-- Insert data into Department table
INSERT INTO Department (department_name, location) VALUES
('HR', 'New York'),
('IT', 'San Francisco'),
('Finance', 'Chicago');

-- Insert data into Employee table
INSERT INTO Employee (first_name, last_name, email, phone_number, hire_date, job_title, salary, department_id) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '2020-01-15', 'Manager', 80000, 1),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '2019-03-23', 'Developer', 70000, 2),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-8765', '2018-06-10', 'Analyst', 65000, 3);

-- Insert data into Project table
INSERT INTO Project (project_name, start_date, end_date, budget, department_id) VALUES
('Project Alpha', '2021-01-01', '2021-12-31', 100000, 2),
('Project Beta', '2021-06-01', '2022-06-01', 200000, 3);

-- Insert data into Manager table
INSERT INTO Manager (employee_id, project_id) VALUES
(1, 1),
(2, 2);


CREATE TABLE students (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT,
    grade INT
);

INSERT INTO students (student_id, first_name, last_name, age, grade) VALUES
(1, 'John', 'Doe', 18, 85),
(2, 'Jane', 'Smith', 19, 92),
(3, 'Michael', 'Johnson', 18, 78),
(4, 'Emily', 'Davis', 20, 95),
(5, 'William', 'Brown', 19, 88),
(6, 'Eva', 'White', 18, 80),
(7, 'Alex', 'Wilson', 20, 90);

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
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


-- Inserting sample data into the customers table
INSERT INTO customers (customer_id, customer_name) VALUES
    (1, 'John Doe'),
    (2, 'Jane Smith'),
    (3, 'Bob Johnson');

-- Inserting sample data into the orders table
INSERT INTO orders (order_id, customer_id, order_date) VALUES
    (101, 1, '2023-01-15'),
    (102, 2, '2023-02-20'),
    (103, 3, '2023-03-25');
    
-- Inserting sample data into the products table
INSERT INTO products (product_id, product_name, unit_price) VALUES
    (1, 'Laptop', 999.99),
    (2, 'Smartphone', 499.99),
    (3, 'Headphones', 79.99);

-- Inserting sample data into the order_items table
INSERT INTO order_items (order_id, product_id, quantity) VALUES
    (101, 1, 2), -- John Doe ordered 2 laptops
    (102, 2, 3), -- Jane Smith ordered 3 smartphones
    (103, 3, 1); -- Bob Johnson ordered 1 pair of headphones
