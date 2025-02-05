import pg from 'pg';
// import { Manager } from './interfaces'
// import ManageEmployee from './ManageEmployee';
const { Pool } = pg;

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
// Selects all employees
async getAllEmployees(): Promise<any[]>{
const results = await pool.query('SELECT * FROM employee');
return results.rows;
}

// get all managers
// selects all managers
async getAllManagers(): Promise<any[]> {
    // selects all managers (checks if manager id is NULL to see if the employee is a manager)
        const results = await pool.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
        // returns all managers to be used in addEmployee function
    return results.rows;
}
// Get all roles
// selects all roles
async getAllRoles(): Promise<any[]>{
const results = await pool.query('SELECT * FROM role');
return results.rows;
}
// Get all departments
async getAllDepartments(): Promise<any[]>{
const results = await pool.query('SELECT * FROM department');
return results.rows;
}
// Add a new employee
async addEmployee(employeeData: { firstName: string; lastName: string; roleId: number; managerId: number }): Promise<void>{
    const { firstName, lastName, roleId, managerId } = employeeData;
    await pool.query (
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, roleId, managerId]
    );
}
// Update an employee's role
async updateEmployeeRole(employeeId: number, newRoleId: number): Promise<void> {
    await pool.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2',
        [newRoleId, employeeId]
    );
}
// Add a new role
async addRole(roleData: { title: string; salary: number; departmentId: number }): Promise<void> {
const { title, salary, departmentId } = roleData;
    await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
);
}
// Add a new department
async addDepartment(departmentData: { name: string }): Promise<void>{
    const { name } = departmentData;
    await pool.query(
        'INSERT INTO department (name) VALUES ($1)',
        [name]
    );
}
}

