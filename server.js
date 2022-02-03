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
        err ? console.error(err) : console.table(data)
        startMenu();
    })
}

//this function is run when the user selects 
viewRoles = () => {
    database.query('SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles JOIN departments ON roles.department_id = departments.id;',(err, data) => {
        err ? console.error(err) : console.table(data)
        startMenu();
    })
}

viewEmployees = () => {
    database.query('SELECT e.id, e.first_name, e.last_name, roles.title, departments.department_name, roles.salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees AS e JOIN roles ON e.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON m.id = e.manager_id;',(err, data) => {
        err ? console.error(err) : console.table(data)
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
        database.query('INSERT INTO departments (department_name) VALUES (?);', newDepart, (err,result) => {err ? console.error :
        startMenu();
        })
    })
}

addRole = () => {
    database.query('SELECT * FROM departments', (err,data) => {
        if (err) {
            console.error(err)
        }   const departmentArray = data.map(function(departments) {
                return {name: departments.department_name, value: departments.id}
            })
        inquirer.prompt([
        {
            type: "input",
            message: "what is the title of the new role?",
            name: "newRoleTitle"
        },
        {
            type: "number",
            message: "what is the salary of the new role?",
            name: "newRoleSalary"
        },
        {
            type: "list",
            message: "what department does this role belong to?",
            name: "newRoleDepartment",
            choices: departmentArray
        },
    ])
    .then((ans) => {
        const newRoleTitle = ans.newRoleTitle;
        const newRoleSalary = ans.newRoleSalary;
        const newRoleDepartment = ans.newRoleDepartment
        database.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [newRoleTitle, newRoleSalary, newRoleDepartment], (err, result) => {err ? console.error(err) : startMenu();
        }) 
    })
});
}

addEmployee = () => {
    database.query('SELECT * FROM roles', (err,data) => {
        if (err) {
            console.error(err)
        }   const roleArray = data.map(function(roles) {
                return {name: roles.title, value: roles.id}
            })
    database.query('SELECT * FROM employees', (err,data) => {
        if (err) {
            console.error(err)
        } const employeeArray = data.map(function(employees) {
            return {name: employees.first_name + ` ` + employees.last_name, value: employees.id}
        })
    inquirer.prompt([
        {
            type: "input",
            message: "what is the employee's first name?",
            name: "newEmployeeFN",
        },
        {
            type: "input",
            message: "what is the employee's last name?",
            name: "newEmployeeLN",
        },
        {
            type: "list",
            message: "what is the employee's role?",
            choices: roleArray,
            name: "newEmployeeRole",
        },
        {
            type: "list",
            message: "who is the employee's manager?",
            choices: employeeArray,
            name: "newEmployeeManager",
        },
    ])
    .then((ans) => {
        const newEmployeeFN = ans.newEmployeeFN;
        const newEmployeeLN = ans.newEmployeeLN;
        const newEmployeeRole = ans.newEmployeeRole;
        const newEmployeeManager = ans.newEmployeeManager;
        database.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [newEmployeeFN, newEmployeeLN, newEmployeeRole, newEmployeeManager], (err,result) => {err ? console.error : 
        startMenu();
        })
    })
});
});
}

updateEmployee = () => {
    database.query('SELECT * FROM employees', (err,data) => {
        if (err) {
            console.error(err)
        } const employeeArray = data.map(function(employees) {
            return {name: employees.first_name + ` ` + employees.last_name, value: employees.id}
        })
    database.query('SELECT * FROM roles', (err,data) => {
        if (err) {
            console.error(err)
        }   const roleArray = data.map(function(roles) {
            return {name: roles.title, value: roles.id}
        })
    inquirer.prompt([
        {
            type: "list",
            message: "what employee do you want to update?",
            choices: employeeArray,
            name: "updateEmployee",
        },
        {
            type: "list",
            message: "what is their new role?",
            choices: roleArray,
            name: "updateEmployeeRole",
        },
    ])
    .then((ans) => {
        const updateEmployee = ans.updateEmployee;
        const updateRole = ans.updateEmployeeRole;
        database.query('UPDATE employees SET role_id = ? WHERE id = ?;', [updateRole, updateEmployee], (err,result) => {err ? console.error : startMenu();
        })
    })
});
});
}

quit = () => {
    CFonts.say('Goodbye!', {
        font: '3d',
        align: 'center',
        colors: [],
        letterSpacing: 1,
        lineHeight: 1,
        gradient: "magenta,cyan",
        independentGradient: true,     
        env: 'node'                 
    });
    database.end();
}

startMenu = () => {
inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "startMenu",
      choices: ["View all departments","View all roles","View all employees", 'Add a department',"Add a role","Add an employee","Update an employee's role","Update an employee's manager","View employees by manager","View employees by department","Quit"]
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
        case "Update an employee's role":
            updateEmployee();
            break;
        // THESE ARE THE BONUS ONES
        case "Update an employee's manager":
            updateEmployeeManager();
            break;
        case "View employees by manager":
            viewEmpByManager();
            break;
        case "View employees by department":
            viewEmpByDepart();
            break;
        default:
            quit();
            break;
    }
})}
;



CFonts.say('Employee|Tracker!', {
    font: '3d',
    align: 'center',
    // colors: ['white'],
    letterSpacing: 1,
    lineHeight: 1,
    gradient: "cyan,magenta",
    independentGradient: true,     
    env: 'node'              
});

startMenu();
