const inquirer = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');

// create ManageEmployee class to implement functions when a user selects what they would like to do with their employee

class ManageEmployee {
// view all employees
// gets all employees in database and inserts data into table
// COME BACK HERE- added getAllEmployees line 13- need to ensure that returns an array of the employees
async viewAllEmployees(){
    const employees = await db.getAllEmployees();
    console.table(employees);
}
// add employee
// COME BACK HERE- added getAllRoles- need to make sure it returns the roles available
async addEmployee(){
// gets available roles to present to the user when adding a new employee.
const roles = await db.getAllRoles();
// gets available managers, so the user can choose which manager the new employee will repot to.
const managers = await db.getAllEmployees();
// prompts the user for the required info to add a new employee to the database
const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter your employee\'s first name:'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter your employee\'s last name:'
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'Enter your employee\'s role:',
        choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
    {
        type: 'list',
        name: 'managerId',
        message: 'Enter your employee\'s manager:',
        choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
    },
]);
// waits for user to answer all required info , then displays message showing employee has been added
await db.addEmployee(answers);
console.log('Your employee has been added!') 
}


// update employee role
async updateEmployeeRole(){

}
// view all roles
async viewAllRoles(){

}
// add role
async addRole(){

}
// view all departments
async viewAllDepartments(){

}
// add department
async addDepartment(){

}
// quit

}
// allows ManageEmployee class to be imported into app.js
module.exports = ManageEmployee;