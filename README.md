Demo API
========

A simple API to teach you about a RESTful.

This API is made with ES6 (ES2015) for more information on ES6 check [Babel](http://babeljs.io/).

Installation
============

1. Install MongoDB.
2. Install NodeJS (at least Node v5.0.0 or greater).
3. Clone the repository with: `git clone https://github.com/sjoerdthijsse/demo-api.git`.
4. Install `gulp` globally with `[sudo] npm install -g gulp`.
5. Install dependencies of the demo-api with `cd demo-api` and `npm install`.
6. Build the ES5 code with `gulp build`.
7. Run the demo-api with `npm start`.

The API will be started on `127.0.0.1` on port `5001`.

Folder Structure
================

```
.
├──build                                   # Directory holding all the old ES5 code.
├──src                                     # Directory holding all the new ES6 code.
    ├── config                             # Directory with various configuration files for the API.
        ├── global.js                      # Object with variables user throughout the API.
        ├── logger.js                      # Configuration for Console and ExpressJS logging with Winston.
        ├── routes.js                      # Configuration for the API endpoints.
        └── setup.js                       # Configuration for MongoDB connection and ExpressJS middleware.
    ├── controllers                        # Directory for the controllers.
        └── users.js                       # Controller for the user model.
    ├── logs                               # Output directory for the log files.
        └── demo-api-1462379396135.log     # Example of a log file.
    ├── models                             # Directory for the models.
        └── User.js                        # The user model.
    ├── demo-api-user1.json                # Example input of a user.
    ├── demo-api-user2.json                # Example input of a user.
    ├── index.js                           # The `main` of the API.
    └── util.js                            # Factory function holding functions used throughout the api.
├── node_modules                           # Directory with depenencies for the API.
├── .babelrc                               # Configuration file for Babel.
├── .gitignore                             # Gitignore file.
├── gulpfile.babel.js                      # Gulpfile for system tasks.
├── package.json                           # File with metadata relevant to the API.
└── README.md                              # Git README.md file.
```

Routes
======

**POST - `http://127.0.0.1:5001/`**

This route will create a new user.

Example of the body for the POST request:
```
{
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@mail.com",
    "username": "john.smith",
    "password": "secret"
}
```

**GET - `http://127.0.0.1:5001/{username}`**

This route will fetch the user matching the given username.

Example of the output from the GET request:

```javascript
{
  "_id": "572a1ab58b5c6d51638def85",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@mail.com",
  "username": "john.smith",
  "password": "secret"
}
```

**PUT - `http://127.0.0.1:5001/{username}`**

This route will update the user matching the given username.

Example of the body for the POST request:

```javascript
{
    "first_name": "John",
    "last_name": "Williams",
    "email": "john.williams@mail.com",
    "username": "john.williams",
    "password": "secret"
}
```

**DELETE - `http://127.0.0.1:5001/{username}`**

This route will remove the user matching the given username.

License
=======

MIT License

Copyright (c) 2016 Sjoerd Thijsse

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
