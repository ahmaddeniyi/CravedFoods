# CravedFoods Project

CravedFoods is a food ordering system that allows the 'admin' to create menus, manage orders and manage customers while the customer can login and place order on any food item.

## Motivation

To save eaters the stress of going down all the way to the cafeteria just to buy their favorite meal.

## Technologies Used

Front-End: HTML, CSS, Bootstrap & EJS
Backend: NodeJS, Express, MongoDB, Mongoose

NOTE THE MONGODB VERSION INSTALLED

## Run Locally on Your Machine

You need Node, NPM and MongoDB properly installed.

## Dependencies

Dependencies are noted in the package.json.
Search for 'Node.js command prompt' on your computer and 'cd' into this project folder
Then Run: npm install

The above command installs all dependencies automatically

## Lastly, Run the App

### To connect the database

Run: "C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe" --dbpath .\data\db

Mine is version 4.0, yours can be different

## To start the app

### Seed the Database (for the very first run only)

Run: node seed/product-seeder.js

### To start the server

Run: npm index.js

### To stop the server

Run: ctrl + c

## Open a web browser to

- [CravedFoods App](http://localhost:3000/) - Home Page
- [CraveDFoods App (Login Page)](http://localhost:8000/api/user/login) - Login page -

### To Login as the ADMIN

Username: admin
password: admin123
