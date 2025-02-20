import pg from 'pg';
const { Pool } = pg;
// Creates a new pool instance for connecting to the SQL database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tracker',
    password: 'Ad@021024!',
    port: 5432,
});
// Destructure the Pool class from the pg module
export default class Db {
    // Get all employees
    // retrieves all employee records from the database
    async getAllEmployees() {
        // Execute SQL query to select all employees & returns the results
        const results = await pool.query('SELECT * FROM employee');
        return results.rows;
    }
    // ---------------------------------------------------
    // get all managers
    // retrieves all employees who are managers (those with no manager_id)
    async getAllManagers() {
        // // Execute SQL query to select employees where manager_id is NULL, indicating they are managers
        const results = await pool.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
        return results.rows;
    }
    // ---------------------------------------------------
    // Get all roles
    //retrieves all job roles from the database
    async getAllRoles() {
        //Execute SQL query to select all roles and returns results
        const results = await pool.query('SELECT * FROM role');
        return results.rows;
    }
    //---------------------------------------------------
    // Get all departments
    // retrieves all departments from the database
    async getAllDepartments() {
        // Execute SQL query to select all departments and return results
        const results = await pool.query('SELECT * FROM department');
        return results.rows;
    }
    //---------------------------------------------------
    // Add a new employee
    //inserts a new employee record into the database
    async addEmployee(employeeData) {
        // Destructures employee data
        const { firstName, lastName, roleId, managerId } = employeeData;
        // // SQL query to insert a new employee
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
        // Values to be inserted, using parameterized queries to prevent SQL injection
        [firstName, lastName, roleId, managerId]);
    }
    //---------------------------------------------------
    // Update an employee's role
    // updates the role of an existing employee
    async updateEmployeeRole(employeeId, newRoleId) {
        // SQL query to update the employee's role
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', 
        // Values expected to be updated
        [newRoleId, employeeId]);
    }
    //---------------------------------------------------
    // Add a new role
    // inserts a new job role into the database
    async addRole(roleData) {
        // Destructures role data
        const { title, salary, departmentId } = roleData;
        // SQL query to insert a new role
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
        // // Values to be inserted
        [title, salary, departmentId]);
    }
    //---------------------------------------------------
    // Add a new department
    // inserts a new department into the database
    async addDepartment(departmentData) {
        // // Destructure department data
        const { name } = departmentData;
        // // SQL query to insert a new department
        await pool.query('INSERT INTO department (name) VALUES ($1)', 
        // Value to be inserted
        [name]);
    }
}
