import pg from 'pg';
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
    async getAllEmployees() {
        const results = await pool.query('SELECT * FROM employee');
        return results.rows;
    }
    // Get all roles
    async getAllRoles() {
        const results = await pool.query('SELECT * FROM role');
        return results.rows;
    }
    // Get all departments
    async getAllDepartments() {
        const results = await pool.query('SELECT * FROM department');
        return results.rows;
    }
    // Add a new employee
    async addEmployee(employeeData) {
        const { firstName, lastName, roleId, managerId } = employeeData;
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    }
    // Update an employee's role
    async updateEmployeeRole(employeeId, newRoleId) {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    }
    // Add a new role
    async addRole(roleData) {
        const { title, salary, departmentId } = roleData;
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    }
    // Add a new department
    async addDepartment(departmentData) {
        const { name } = departmentData;
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    }
}
