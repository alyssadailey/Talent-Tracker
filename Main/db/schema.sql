DROP DATABASE IF EXISTS tracker;
-- creates tracker DB
CREATE DATABASE tracker;

\c tracker;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (

);

CREATE TABLE employee (

);