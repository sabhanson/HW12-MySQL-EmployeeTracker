const inquirer = require('inquirer'); //required to use inquirer prompts
const mysql2 = require("mysql2"); //required to use mysql commands in js
const CFonts = require('cfonts'); //required to use the cfonts banners

//creating a connection to mysql shell
const database = mysql2.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
);

//this function is run when the user selects to "view all departments"
//it runs a sql command to select from departments (table) which will console.log a table for the user to see
viewDepartments = () => {
    database.query('SELECT * FROM departments',(err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.table(data)
            startMenu();
        }
    })
}

//this function is run when the user selects to "view all roles"
//it runs a sql command to select from roles (table) which will console.log a table for the user to see
viewRoles = () => {
    database.query('SELECT roles.id, roles.title AS Job_Title, roles.salary AS Salary, departments.department_name AS Department FROM roles JOIN departments ON roles.department_id = departments.id;',(err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.table(data)
            startMenu();
        }
    })
}

//this function is run when the user selects to "view all employees"
//it runs a sql command to select from the employees (table) which will console.log this table for the user to see
//this one is special since it is taking two instances of the table 'e' and 'm' to be able to do an INNER JOIN to show managers (since managers are also employees)
//CONCAT on employee first/last name and managers first/last name to show as one value in one column
viewEmployees = () => {
    database.query('SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS Employee, roles.title AS Job_Title, departments.department_name AS Department, roles.salary AS Salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees AS e JOIN roles ON e.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON m.id = e.manager_id;',(err, data) => {
        if (err) {
        console.error(err)
        } else {    
        console.table(data)
        startMenu();
        }
    })
}

//this function is run when the user selects to "add a department"
//first it runs a prompt to ask the user what the department name is
//then with the promise of the prompt, 
addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the department name?",
            name: "newDepartment",
        }
    ])
    .then((ans) => {
        const newDepart = ans.newDepartment;
        database.query('INSERT INTO departments (department_name) VALUES (?);', newDepart, (err,data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(`New department, ${newDepart}, was successfully added!`);
                startMenu();
            }
        })
    })
}

//this function is run when the user selects to "add a role"
//first it runs a query to create an array of the department names so the user can select which a department from the ones we have available
addRole = () => {
    database.query('SELECT * FROM departments', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const departmentArray = data.map(function(departments) {
            return {name: departments.department_name, value: departments.id}
            })
        inquirer.prompt([
        {
            type: "input",
            message: "What is the job title of the new role?",
            name: "newRoleTitle"
        },
        {
            type: "number",
            message: "What is the salary of the new role?",
            name: "newRoleSalary"
        },
        {
            type: "list",
            message: "Which department does this role belong to? (You must select one)",
            name: "newRoleDepartment",
            choices: departmentArray
        },
    ])
    //then with the answers to the prompts, make a query with the data from the prompts
    //then return to the start menu if there were no errors
    .then((ans) => {
        const newRoleTitle = ans.newRoleTitle;
        const newRoleSalary = ans.newRoleSalary;
        const newRoleDepartment = ans.newRoleDepartment
        database.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [newRoleTitle, newRoleSalary, newRoleDepartment], (err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.log(`New role, ${newRoleTitle}, was successfully added!`);
                startMenu();
            }
        }) 
    })
}
});
}

//this function is run when the user selects to "add an employee"
//first it runs a query to create an array of the available roles, so the user can select which role this employee will have
addEmployee = () => {
    database.query('SELECT * FROM roles', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const roleArray = data.map(function(roles) {
            return {name: roles.title, value: roles.id}
            })
    //then it runs another query to create an array of all of the available employees, so the user can select a manager for the new employee
    database.query('SELECT * FROM employees', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const employeeArray = data.map(function(employees) {
            return {name: employees.first_name + ` ` + employees.last_name, value: employees.id}
        }) 
    //prompts ask for employee first name, last name, role, and manager
        inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "newEmployeeFN",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "newEmployeeLN",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                choices: roleArray,
                name: "newEmployeeRole",
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                choices: employeeArray,
                name: "newEmployeeManager",
            },
        ])
        .then((ans) => {
            const newEmployeeFN = ans.newEmployeeFN;
            const newEmployeeLN = ans.newEmployeeLN;
            const newEmployeeRole = ans.newEmployeeRole;
            const newEmployeeManager = ans.newEmployeeManager;
            database.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [newEmployeeFN, newEmployeeLN, newEmployeeRole, newEmployeeManager], (err,result) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(`New employee, ${newEmployeeFN} ${newEmployeeLN}, was successfully created`)
                    startMenu();
                }   
            })
        })
    }
});
}
});
}

//this function is run when the user selects to "update an employee"
//first it runs a query to create an array of the available employees, the user will select which employee to update
updateEmployee = () => {
    database.query('SELECT * FROM employees', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const employeeArray = data.map(function(employees) {
            return {name: employees.first_name + ` ` + employees.last_name, value: employees.id}
        })
    //another query to return an array of the available roles, so the user can update the employees role to a new one    
    database.query('SELECT * FROM roles', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const roleArray = data.map(function(roles) {
            return {name: roles.title, value: roles.id}
        })
    //then the prompts ask the user to choose an available employee, and choose an available role    
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee do you want to update?",
            choices: employeeArray,
            name: "updateEmployee",
        },
        {
            type: "list",
            message: "What is their new role?",
            choices: roleArray,
            name: "updateEmployeeRole",
        },
    ])
    //then based on those answers, there will be another query done to update the specified employees data
    .then((ans) => {
        const updateEmployee = ans.updateEmployee;
        const updateRole = ans.updateEmployeeRole;
        database.query('UPDATE employees SET role_id = ? WHERE id = ?;', [updateRole, updateEmployee], (err,result) => {
            if (err) {
                console.error
            } else {
                console.log(`Your employee was updated successfully`)
                startMenu();
            }
        })
    })
}
});
}
});
}

//this function runs when the user selects to quit the application
//a CFonts banner is logged that says "Goodbye!"
//then the database is set to end
quit = () => {
    CFonts.say('Goodbye!', {
        font: '3d',
        align: 'center',
        colors: ['magenta','cyan'],
        letterSpacing: 1,
        lineHeight: 1, 
        env: 'node'                 
    });
    database.end();
}

//this function is run when the application is started
//inquirer prompts them to make a selection for what they would like to do
startMenu = () => {
inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "startMenu",
      choices: ["View all departments","View all roles","View all employees", 'Add a department',"Add a role","Add an employee","Update an employee's role","Quit"]
    },
])
//then based on their answer, the application will do one of the following:
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
        case "Update an employee's role":
            updateEmployee();
            break;
        default:
            quit();
            break;
    }
})}
;

//this function is run when the application is started, it displays a banner that reads "Employee Tracker"
cFontEmpTracker = () => {
    CFonts.say('Employee|Tracker!', {
        font: '3d',
        align: 'center',
        colors: ['magenta','cyan'],
        letterSpacing: 1,
        lineHeight: 1, 
        env: 'node'       
    });
}
    
//run the empTracker banner and st
cFontEmpTracker();
startMenu();
