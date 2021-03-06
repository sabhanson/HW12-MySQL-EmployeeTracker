# MySQL Employee Tracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
I created this Employee Tracker for a company to be able to manage their employee database. They can create various departments, roles within those departments, and employees within those roles. The user can also update employee roles in the database to reflect actual changes within the company.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Badges](#badges)
- [Questions](#questions)
- [Credits](#credits)

## Installation
      
[Watch this video for a step-by-step demonstration, including installation and usage instructions](https://www.youtube.com/watch?v=9ZBxpcoHhV4)

OR   
- Clone [this repo](https://github.com/sabhanson/HW12-MySQL-EmployeeTracker) from my Github to your local machine
- Open VSCode and run the following command in the built-in terminal to install the necessary node packages
``` 
npm install
```
- Now you need to run the SQL files to actually create the database and tables
- Run the following commands in the built-in terminal
```
mysql -u root -p
```
- Enter your password when prompted
```
SOURCE schema.sql;
```
- This schema file creates the database where we will store the employee information
```
SOURCE seeds.sql;
```
- This seeds file will "seed" test data so the user can actually use the application as intended
- Now, stop the terminal from running MySQL commands by typing
```
quit;
```
- Now open the server.js in the integrated terminal and run the following command
```
node server.js
```
- Congrats, you have successfully installed this application and are ready to navigate through the Employee Tracker  ✅

## Usage
Follow the Installation instructions above then use the following keystrokes to navigate the application
- ↕️ Up and Down arrows to scroll through the available options
- `enter` key to select an option
- 🔤 letter keys to type in answers to prompts
- 🔢 number keys to type in answers to prompts    

This is what the Employee Tracker Application looks like when run in the VSCode built-in terminal

![Screenshot of Employee Tracker Application](/assets/EmpTracker.png)  

## License
<p>
MIT License

  Copyright &copy; 2022 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  </p>

## Contributing
To contribute, please contact me via [Github](https://www.github.com/sabhanson) or [email](mailto:sabhanson7@gmail.com)

## Tests
Testing was all self-done in the terminal.

## Badges

![GitHub followers](https://img.shields.io/github/followers/sabhanson?style=social)

## Questions
Contact me via [Github](https://www.github.com/sabhanson) or [email](mailto:sabhanson7@gmail.com)

## Credits
Thanks to [Isaac Petersen](https://www.github.com/idpetersen) for always being willing to collab and work through problems.
