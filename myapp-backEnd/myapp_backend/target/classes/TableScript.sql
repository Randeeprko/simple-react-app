DROP DATABASE if exists CUSTOMER_DB;
CREATE DATABASE CUSTOMER_DB;
USE  CUSTOMER_DB;


CREATE TABLE Customer(
   customer_id INT,
   emailid VARCHAR(50),
   name VARCHAR(20),
   date_of_birth DATETIME,
   customer_type VARCHAR(10),
   constraint ps_customer_id_PK primary key ( customer_id )
);


INSERT INTO Customer (customer_id, emailid, name, date_of_birth, customer_type) VALUES (1, 'martin@infy.com', 'Martin', SYSDATE()- INTERVAL 9136 DAY, 'GOLD');
commit;
select * from Customer;