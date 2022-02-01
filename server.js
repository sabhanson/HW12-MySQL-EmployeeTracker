// AS A business owner
// I WANT to be able to view and manage the departments, roles, and employees in my company
// SO THAT I can organize and plan my business

// GIVEN a command-line application that accepts user input
//TODO: inquirer prompts
// WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//TODO: invoke application with command node server.js
//TODO: inquirer prompt with these choices:
//VIEW ALL DEPARTMENTS
//VIEW ALL ROLES
//VIEW ALL EMPLOYEES
//ADD A DEPARTMENT
//ADD A ROLE (WITHIN A DEPARTMENT)
//ADD AN EMPLOYEE (WITH A ROLE)
//UPDATE AN EMPLOYEE ROLE
// WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
//TODO: switch statement with cases for each of the inquirer choices
//TODO: run .query("SELECT * FROM department") to show the table and data
// WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//TODO: case for this choice
//TODO:
// WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
//TODO:
// WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
//TODO:
// WHEN I choose to add a roleTHEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//TODO:
// WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//TODO:
// WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
//TODO:

const { star } = require("cli-spinners");
const express = require("express");
const inquirer = require('inquirer');
const { endsWith } = require("lodash");
const app = express();
const mysql2 = require("mysql2");
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const database = mysql2.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
);


viewDepartments = () => {
    database.query('SELECT * FROM departments',(err, data) => {
        err ? console.error : console.table(data)
        startMenu();
    })
}

viewRoles = () => {
    database.query('SELECT * FROM roles',(err, data) => {
        err ? console.error : console.table(data)
        startMenu();
    })
}

viewEmployees = () => {
    database.query('SELECT * FROM employees',(err, data) => {
        err ? console.error : console.table(data)
        startMenu();
    })
}

addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "what is the department name?",
            name: "newDepartment",
        }
    ])
    .then((ans) => {
        const newDepart = ans.newDepartment;
        database.query('INSERT INTO departments (department_name) VALUES (?);', newDepart, (err,data) => {err ? console.error : console.log()
        startMenu();
        })
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "what is the name of the new role?",
            name: "newRole"
        }
    ])
    .then((ans) => )
}
addEmployee = () => {}
updateEmployee = () => {}
quit = () => {
    database.end();
}

startMenu = () => {
inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "startMenu",
      choices: ["View all departments","View all roles","View all employees", 'Add a department',"Add a role","Add an employee","Update an employee role","Quit"]
    },
])
.then((ans) => {
    switch (ans.startMenu) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee":
            updateEmployee();
            break;
        case "Quit":
            quit();

        default:
            break;
    }
})}
;

startMenu();


// database.query("SELECT * FROM students", function (err, results) {
//   console.log(results);
// });
