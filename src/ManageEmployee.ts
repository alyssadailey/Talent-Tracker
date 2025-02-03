import inquirer from 'inquirer';
import db from "./db.js";

// create ManageEmployee class to implement functions when a user selects what they would like to do with their employee

export default class ManageEmployee {

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
console.log('Your employee has been added!');
}


// update employee role
async updateEmployeeRole(){
// fetchs the employees to present to the user
const employees = await db.getAllEmployees();
// fetchs the roles to present to the user
const roles = await db.getAllRoles();
// asks user for the needed info to update an employee
const answers = await inquirer.prompt([
{
    type: 'list',
    name: 'employeeId',
    message: 'Please select the employee you would like to update',
    choices: employees.map(employee =>({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
},
{
    type: 'list',
    name: 'newRoleId',
    message: 'Select the new role for the employee',
    choices: roles.map(role => ({ name: role.title, value: role.id })),
},
]);

await db.updateEmployeeRole(answers.employeeId, answers.newRoleId);
console.log('Your employee has sucessfully been updated!')
}
// view all roles
async viewAllRoles(){
// displays all of the roles in a table
const roles = await db.getAllRoles();
console.table(roles);

}
// add role
// COME BACK HERE-- use getAllDepartments- need to make sure it fetches all of the saved departments
async addRole(){
// gets all of the current departments stored in db
const departments = await db.getAllDepartments();
//  asks user for the needed info to add a new role
const answers = await inquirer.prompt([
{
    type: 'input',
    name: 'title',
    message: 'Enter the new roll title you would like to add:'
},
{
    type: 'input',
    name: 'salary',
    message: 'Enter the role salary:',
    validate: (input) => !isNaN(input) || 'Please enter a valid number.',
},
{
    type: 'input',
    name: 'departmentId',
    message: 'Select the department for this role:',
    choices: departments.map(department=> ({ name: department.name, value: department.id })),
},
]);

await db.addRole(answers);
console.log('New role has been added sucessfully!');
}
// view all departments
async viewAllDepartments(){

const departments = db.getAllDepartments();
console.table(departments);

}

// add department
async addDepartment(){
const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the new department you would like to add:',
    },
]);

await db.addDepartment(answers);
console.log('Your new department has been added succesfully!')
}
// quit is handled in app.js
}
