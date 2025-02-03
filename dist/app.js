import { default as inquirer } from 'inquirer';
// import db from './db.js';
import ManageEmployee from './ManageEmployee.js';
// creates an instance of ManageEmployee
const manageEmployee = new ManageEmployee();
// method for 1st prompt -"what would you like to do"
// gives the user the actions they can preform with the Talent-Tracker
const startApp = async () => {
    const { employeePrompts } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeePrompts',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add employee',
                'Update employee roles',
                'View all roles',
                'Add role',
                'View all departments',
                'Add department',
                'Quit'
            ],
        },
    ]);
    // switch statement is used to implement the correct action when a user selects what they would like to do with their employee
    switch (employeePrompts) {
        // view all employees
        case 'View all employees':
            manageEmployee.viewAllEmployees();
            break;
        // add employee
        case 'Add employee':
            manageEmployee.addEmployee();
            break;
        // update employee role
        case 'Update Employee Role':
            manageEmployee.updateEmployeeRole();
            break;
        // view all rolse
        case 'View all roles':
            manageEmployee.viewAllRoles();
            break;
        // add role
        case 'Add role':
            manageEmployee.addRole();
            break;
        // view all departments
        case 'View all departments':
            manageEmployee.viewAllDepartments();
            break;
        // add department
        case 'Add department':
            manageEmployee.addDepartment();
            break;
        // quit
        case 'Quit':
            console.log('Thanks for using Talent-Tracker! Goodbye!');
            process.exit();
    }
    // executes startApp function
};
startApp();
