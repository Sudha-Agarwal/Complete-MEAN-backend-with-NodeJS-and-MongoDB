-- To create a new user
CREATE USER 'SUDHA'@'%' IDENTIFIED BY '1234';

-- To see all the existing users:
SELECT user, host FROM mysql.user;

-- To see permission of a user
SHOW GRANTS FORM 'SUDHA'@'%';

-- To grent privelges
GRANT SELECT, INSERT ON MEAN_BACKEND.* TO 'SUDHA'@'%';

-- To grant all the priveleges to a user
GRANT ALL PRIVELEGES ON *.* TO 'SUDHA'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

-- Revoke Privilege
REVOKE SELECT, INSERT ON MEAN_BACKEND.* FROM 'SUDHA'@'%';

-- Drop a User
DROP USER 'SUDHA'@'%';

-- To view currently logged in user in Mysql
SELECT CURRENT_USER();

-- To view the active users/currently executing threads(queries)(done by Admin)
SHOW PROCESSLIST;


