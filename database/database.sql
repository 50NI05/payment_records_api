CREATE DATABASE IF NOT EXISTS registerPaymentDB;
USE registerPaymentDB;
CREATE TABLE t_user (
  id INT(10) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) DEFAULT NULL,
  lastName VARCHAR(45) DEFAULT NULL,
  username VARCHAR(100) DEFAULT NULL,
  password VARCHAR(150) DEFAULT NULL,
  profile INT(10) DEFAULT 1,
  token VARCHAR(600) DEFAULT NULL,
  PRIMARY KEY (id)
);
DESCRIBE t_payment;
CREATE TABLE t_payment (
  id INT(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT NULL,
  identity_card INT DEFAULT NULL,
  phone_number BIGINT DEFAULT NULL,
  apartment INT(10) DEFAULT NULL,
  reference_number BIGINT DEFAULT NULL,
  amount FLOAT DEFAULT NULL,
  payment_date DATETIME DEFAULT NULL
  PRIMARY KEY (id)
);
ALTER TABLE t_payment ADD payment_date DATETIME DEFAULT NULL;
SELECT * FROM t_payment;
INSERT INTO t_payment VALUES (1, 1, 'A', 1.0, now());