import {default as inquirer} from 'inquirer';

import ManageEmployee from './ManageEmployee.js';

// creates an instance of ManageEmployee
const manageEmployee = new ManageEmployee();
// method for 1st prompt -"what would you like to do"
const startApp = async () => {
    // gives the user the actions they can preform with the Talent-Tracker
    const { employeePrompts } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeePrompts',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add employee',
                'Update employees role',
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
// view all employees-WORKING
case 'View all employees':
    await manageEmployee.viewAllEmployees();
    break;
// add employee- WORKING
case 'Add employee':
    await manageEmployee.addEmployee();
    break;
// update employee role-WORKING
case 'Update employees role':
    await manageEmployee.updateEmployeesRole();
    break;
// view all roles- WORKING
case 'View all roles':
    await manageEmployee.viewAllRoles();
    break;

//add role- WORKING
case 'Add role':
    await manageEmployee.addRole();
    break;

// view all departments- WORKING
case 'View all departments':
    await manageEmployee.viewAllDepartments();
    break;

// add department= WORKING
case 'Add department':
    await manageEmployee.addDepartment();
    break;

// quit- WORKING
case 'Quit':
    console.log ('Thanks for using Talent-Tracker! Goodbye!');
    process.exit();

}
// calls startApp again to allow another question to be asked
startApp();
};

// executes startApp function
startApp();