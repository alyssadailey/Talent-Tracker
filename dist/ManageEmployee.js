import inquirer from 'inquirer';
import Db from "./db.js";
// import { Manager } from "./interfaces.js";
// Creates a new instance of the Db class, allowing access to its methods for database interactions.
const db = new Db();
// create ManageEmployee class to implement functions when a user selects what they would like to do with their employee
export default class ManageEmployee {
    // view all employees- WORKING
    async viewAllEmployees() {
        // gets all employees in database and inserts data into table
        const employees = await db.getAllEmployees();
        console.table(employees);
    }
    // add employee- WORKING
    async addEmployee() {
        // gets available roles to present to the user when adding a new employee.
        const roles = await db.getAllRoles();
        // gets available managers, so the user can choose which manager the new employee will report to.
        const managers = await db.getAllManagers();
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
                    { name: 'No Manager', value: null }
                ],
            },
        ]);
        // waits for user to answer all required info , then displays message showing employee has been added
        await db.addEmployee(answers);
        console.log('Your employee has been added!');
    }
    // update employee role-WORKING
    async updateEmployeesRole() {
        try {
            // // Fetches all employees from the database
            const employees = await db.getAllEmployees();
            // handles the case if there are no employees in the db
            if (!employees.length) {
                console.log("No employees found");
                return;
            }
            // Prepares a list of employees to prompt the user for selection
            const employeeChoice = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            // Prompts the user to select an employee to update
            const { employeeId } = await inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Please select the employee you would like to update:",
                    choices: employeeChoice
                }
            ]);
            // Fetches all roles to present to the user for updating the employee's role
            const roles = await db.getAllRoles();
            if (!roles.length) {
                console.log("No roles found.");
                return;
            }
            // Prepares a list of roles for the user to select the new role
            const roleChoice = roles.map((role) => ({
                name: role.title,
                value: role.id
            }));
            // Prompts the user to select the new role for the employee
            const { newRoleId } = await inquirer.prompt([
                {
                    type: "list",
                    name: "newRoleId",
                    message: "Select the new role for the employee:",
                    choices: roleChoice
                }
            ]);
            // Updates the employee's role in the database
            await db.updateEmployeeRole(employeeId, newRoleId);
            console.log("Employee role updated successfully!");
        }
        catch (error) {
            console.error("Error updating employee role:", error);
        }
    }
    // view all roles- WORKING
    async viewAllRoles() {
        // displays all of the roles in a table
        const roles = await db.getAllRoles();
        console.table(roles);
    }
    // add role- WORKING
    async addRole() {
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
                choices: departments.map(department => ({ name: department.name, value: department.id })),
            },
        ]);
        // Checks if the role already exists in the database
        const roles = await db.getAllRoles();
        const roleExists = roles.some(role => role.title.toLowerCase() === answers.title.toLowerCase());
        // handles when a user tries to add an already existing role
        if (roleExists) {
            console.log('This role already exists. Please enter a new role');
            return;
        }
        // Adds the new role to the database
        await db.addRole(answers);
        console.log('New role has been added sucessfully!');
    }
    // view all departments- WORKING
    async viewAllDepartments() {
        // displays all departments in a table
        const departments = await db.getAllDepartments();
        console.table(departments);
    }
    // add department-WORKING
    // Method to add a new department
    async addDepartment() {
        // Prompts the user for the name of the new department
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the name of the new department you would like to add:',
            },
        ]);
        // Checks if the department already exists in the database
        const existingDepartments = await db.getAllDepartments();
        const departmentExists = existingDepartments.some(department => department.name === answers.name);
        if (departmentExists) {
            console.log('This department already exists. Please enter a different name.');
            return;
        }
        // logs the department that is currently being added, or has been added succesfully
        console.log('Adding department:', answers);
        //logs that the department has been added succesfully
        await db.addDepartment(answers);
        console.log('Your new department has been added succesfully!');
    }
}
