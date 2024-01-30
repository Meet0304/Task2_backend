# Task2_backend

Simple CRUD opration using Node.js with Express

step 1 : 
  - (run this in your terminal)
  - npm init
  - npm i express

step 2 : 
  - run index file
  - node index.js


Create operation:
  - to run this open postman , select post method and enter this url
  - http://localhost:3000/user/add
  - Request Body:
    {
      "fullname": "John Doe",
      "age": 25,
      "username": "john_doe",
      "password": "securepassword"
    }

Read operation:
  - Open postman select Get method and enter this url
  - http://localhost:3000/user/list

Update operation:
  - open postman select put method and enter this url
  - http://localhost:3000/user/update/{username}
  - Request Body:
    {
      "fullname": "John Doe",
      "age": 25,
      "username": "john_doe",
      "password": "securepassword"
    }

delete operation:
  - open postman select delete method and enter this url
  - http://localhost:3000/user/delete/{username}
