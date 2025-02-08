DROP DATABASE IF EXISTS tracker;
-- creates tracker DB
CREATE DATABASE tracker;
-- connects to the tracker database
\c tracker;

-- Creates the 'department' table to store department information
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
-- Creates the 'role' table to store department information
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);
-- Creates the 'employee' table to store department information
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);