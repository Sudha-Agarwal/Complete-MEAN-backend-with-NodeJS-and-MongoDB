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

-- find the average grade for each age group
SELECT AGE, AVG(GRADE) AS AVG_GRADE
FROM STUDENTS
GROUP BY AGE;

-- Find Ages with Average Grade Greater Than 85
SELECT AGE, AVG(GRADE) AS AVG_GRADE
FROM STUDENTS
GROUP BY AGE
HAVING AVG_GRADE > 85;

-- Find the Maximum Grade for Students Aged ABOVE 18 FOR EACH AGE GROUP
SELECT AGE, MAX(GRADE) AS MAX_GRADE
FROM STUDENTS
WHERE AGE > 18
GROUP BY AGE;

-- Count the Number of Students in Each AGE
SELECT AGE, COUNT(*) AS student_count
FROM students
GROUP BY AGE;

-- Find the Minimum Age Among Students with a Grade Less Than 80
SELECT MIN(AGE) AS MIN_AGE
FROM STUDENTS
WHERE GRADE < 80;