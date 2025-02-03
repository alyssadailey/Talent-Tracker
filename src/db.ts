import { Pool } from 'pg';

// Creates a new pool instance for connecting to the database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tracker',
    password: 'Ad@021024!',
    port: 5432,
});

export default class Db {
// Get all employees
async getAllEmployees(): Promise<any[]>{
const results = await pool.query('SELECT * FROM employee');
return results.rows;
}
// Get all roles
async getAllRoles(): Promise<any[]>{
const results = await pool.query('SELECT * FROM role');
return results.rows;
}
// Get all departments
async getAllDepartments(): Promise<any[]>{
const results = await pool.query('SELECT * FROM department');
return results.row;
}
// Add a new employee
async addEmployee(){

}
// Update an employee's role
async updateEmployeeRole(){

}
// Add a new role
async addRole(){

}
// Add a new department
async addDepartment(){
    
}
}

