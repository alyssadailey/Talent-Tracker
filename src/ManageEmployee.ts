import inquirer from 'inquirer';
import Db from "./db.js";
// import { Manager } from "./interfaces.js";

// Creates a new instance of the Db class, allowing access to its methods for database interactions.
const db = new Db();

// create ManageEmployee class to implement functions when a user selects what they would like to do with their employee
export default class ManageEmployee {

// view all employees- WORKING
async viewAllEmployees(){
// gets all employees in database and inserts data into table
    const employees = await db.getAllEmployees();
    console.table(employees);

}

// add employee- WORKING
async addEmployee(){
    // gets available roles to present to the user when adding a new employee.
    const roles = await db.getAllRoles();
    // todo: gets available managers, so the user can choose which manager the new employee will report to.
    const managers = await db.getAllManagers();
    // console.log("Available Roles:", roles);
    // console.log("Available Managers:", managers);
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
            choices: [
                ...managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
                {name: 'No Manager', value: null}
            ],
        },
    ]);

    // waits for user to answer all required info , then displays message showing employee has been added
    await db.addEmployee(answers);
    console.log('Your employee has been added!');
    }

// update employee role--NOT WORKING- immediatly exiting function
function updateEmployeesRole(){

// try {
// fetchs the employees to present to the user
// const employees = await db.getAllEmployees();
db.getAllEmployees().then(({ rows })=> {
    const employees = rows;
    const employeeChoice = employees.map(({ id, first_name, last_name })=>({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please select the employee you would like to update',
            choices: employeeChoice
        },
    ]).then((res)=>{
        const employeeId = res.employeeId;
        db.getAllRoles().then(({ rows })=> {
            const roles = rows;
            const roleChoice = roles.map(({ id, title })=>({
                name: title,
                value: id
    }));
    inquirer.prompt([
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for the employee',
            choices: roleChoice
    
        },
    ]).then((res)=> db.updateEmployeeRole(employeeId, res.newRoleId))
    .then(()=> console.log('Employee role updated'))
    });
});
})
}
// testing employees and roles
// console.log('Employees:', employees);
// console.log('Roles:', roles);
// asks user for the needed info to update an employee
// const answers = await inquirer.prompt([
// {
//     type: 'list',
//     name: 'employeeId',
//     message: 'Please select the employee you would like to update',
//     choices: employees.map(employee =>({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
// },
// {
//     type: 'list',
//     name: 'newRoleId',
//     message: 'Select the new role for the employee',
//     choices: roles.map(role => ({ name: role.title, value: role.id })),
    
// },
// ]);
// updates the employee's role and logs success message to user
// await db.updateEmployeeRole(answers.employeeId, answers.newRoleId);
// console.log('Your employee has sucessfully been updated!')
// } catch (error) {
//     console.error('Error updating employee role:', error);
// }
// }
// view all roles- WORKING
async viewAllRoles(){
// displays all of the roles in a table
const roles = await db.getAllRoles();
console.table(roles);

}

// add role- NOT WORKING
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
    validate: (input) => !isNaN(Number.parseInt(input)) || 'Please enter a valid number.',
},
{
    type: 'list',
    name: 'departmentId',
    message: 'Select the department for this role:',
    choices: departments.map(department=> ({ name: department.name, value: department.id })),
},
]);

await db.addRole(answers);
console.log('New role has been added sucessfully!');
}

// view all departments- WORKING
async viewAllDepartments(){

const departments = await db.getAllDepartments();
console.table(departments);

}

// add department-NOT WORKING- error: duplicate key value violates unique constraint "department_pkey" 
async addDepartment(){
const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the new department you would like to add:',
    },
]);

// displays the existing departments
const existingDepartments = await db.getAllDepartments();
console.log('Existing Departments:', existingDepartments);

const departmentExists = existingDepartments.some(department => department.name === answers.name);

if (departmentExists){
    console.log('This department already exists. Please enter a different name.')
    return;
}
// logs that the department is currently being added, or has been added succesfully
console.log('Adding department:', answers);
await db.addDepartment(answers);
console.log('Your new department has been added succesfully!')
}
// quit is handled in app.js
}
