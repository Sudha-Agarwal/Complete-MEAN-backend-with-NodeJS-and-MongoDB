show databases;

use mean_backend;

show tables;

drop table Department, Employee, Project, Manager;

CREATE TABLE Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

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


CREATE TABLE Manager (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    project_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DESC Employee;
ALTER TABLE Employee ADD phone_number1 VARCHAR(15);

ALTER TABLE EMPLOYEE MODIFY EMAIL VARCHAR(50);

ALTER TABLE EMPLOYEE DROP COLUMN PHONE_NUMBER1;

TRUNCATE TABLE EMPLOYEE;

DROP DATABASE mean_backend;

-- DML COMMANDS
-- INSERT
INSERT INTO Department (department_name, location) VALUES
('HR', 'New York'),
('IT', 'San Francisco'),
('Finance', 'Chicago');

SELECT * FROM DEPARTMENT;

INSERT INTO EMPLOYEE VALUES(4,'Sudha', 'Agarwal', 'sudha4@gmail.com', '1234567899', '2024-06-15',
'Trainer', 20000, 1);

select * from Employee WHERE EMPLOYEE_ID = 1 AND EMAIL='sudha@gmail.com';

-- Not allowed
INSERT INTO EMPLOYEE VALUES(3,'Sudha', 'Agarwal', 'sudha3@gmail.com', '1234567899', '2024-06-15',
'Trainer', 20000, 1);

-- UPDATE
UPDATE EMPLOYEE SET SALARY = 20000, job_title = 'Lead Trainer' WHERE EMPLOYEE_ID = 1 AND  EMAIL = 'sudha@gmail.com';

-- DELETE
DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID = 1;

INSERT INTO Project (project_name, start_date, end_date, budget, department_id) VALUES
('Project Alpha', '2021-01-01', '2021-12-31', 100000, 2),
('Project Beta', '2021-06-01', '2022-06-01', 200000, 3);

INSERT INTO Manager (employee_id, project_id) VALUES
(1, 1),
(1, 2);
-- count the number of employees in each department
select department_id, count(employee_id) from employee 
group by department_id;

-- Departments with more than one employee
select department_id, count(employee_id) from employee 
group by department_id
having count(employee_id) >1;

-- Display the employee information along with department(JOIN)
SELECT E.EMPLOYEE_ID,
E.FIRST_NAME,
D.DEPARTMENT_NAME
FROM EMPLOYEE AS E
INNER JOIN
DEPARTMENT AS D ON E.DEPARTMENT_ID = D.DEPARTMENT_ID;

SELECT * FROM EMPLOYEE;

SELECT * FROM DEPARTMENT;

-- SHOW DEPARTMENT INFO ALONG WITH EMPLOYEES WORKING IN THAT DEPARTMENT. IT SHOULD SHOW ALL THE 
-- DEPARTMENTS IRRESPECTIVE OF ANY EMPLOYEE IS THERE OR NOT

SELECT D.DEPARTMENT_NAME,
E.FIRST_NAME
FROM
DEPARTMENT AS D
RIGHT OUTER JOIN
EMPLOYEE AS E ON D.DEPARTMENT_ID = E.DEPARTMENT_ID;


-- TO SHOW EMPLOYEE NAME, DEPARTMENT NAME AND MANAGER ID

SELECT M.MANAGER_ID,
E.FIRST_NAME,
D.DEPARTMENT_NAME
FROM MANAGER AS M
INNER JOIN 
EMPLOYEE AS E ON M.EMPLOYEE_ID = E.EMPLOYEE_ID
INNER JOIN 
DEPARTMENT AS D ON E.DEPARTMENT_ID = D.DEPARTMENT_ID;


