# Lambda School Better Professor API

## Base URL
https://better-professor-app-1.herokuapp.com/

## Register A New User

HTTP Method: POST

URL: /api/auth/register

### Headers 

Name         | Type   |Required| Description             |
-------------|--------|--------|-------------------------|
Content-Type |String  | Yes    | Must be application/json|


### Body 

Name       | Type    | Required | Description                                        |
-----------|-------- |----------| ---------------------------------------------------|
type       | String  | Yes      | User's type(professor/student)                     |
firstName  | String  | Yes      | User's first name                                  |
lastName   | String  | No       | User's last name                                   |
email      | String  | Yes      | User's email address                               |
username   | String  | Yes      | User's desired username(must be unique)            |
password   | String  | Yes      | User's password(must be at least 6 chars)          |
profId     | Integer | No       | Student's Professor Id(required for student types) |

### Example 

```javascript
{
    username: "DameDolla",
    firstName: "Damian",
    lastName: "Lillard",
    password: 'dame',
    email: "dame@blazers.com",
    type: "student",
    profId: 2
}
```

### Response

#### 201 (Created)
 > If successfully registered, endpoint will return HTTP response with status code and a body with a token, user's first and last name, id, email address, username, type, and welcome message

##### Example Response

```javascript
{
    "data": {
        "message": "Welcome Damian",
        "user": {
            "id": 4,
            "username": "DameDolla",
            "First Name": "Damian",
            "Last Name": "Lillard",
            "email": "dame@blazers.com",
            "type": "student"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IkRhbWVEb2xsYSIsImlhdCI6MTU4Mjg2MDQ1MCwiZXhwIjoxNTgyODY0MDUwfQ.45T0cuAYZSyb5XYLJqdIent0zAJZTDgV7z-ZGdhOJm0"
    }
}
```

#### 400 (Bad Request)
> If required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 500 (Internal Error) 
> If there was a server error registering the user, a response with status code 500 will be returned.

## Log In A User

HTTP Method: Post

URL: /api/auth/login

### Headers 

Name         | Type   |Required  | Description             |
-------------|--------|----------|-------------------------|
Content-Type |String  | Yes      | Must be application/json|


### Body 

Name       | Type   | Required | Description                              |
-----------|--------|----------| -----------------------------------------|
username   | String | Yes      | User's username at registration          |
password   | String | Yes      | User's chosen password                   |
type       | String | Yes      | User's type(professor/student)           |

### Example 

```javascript
{
    username: 'DameDolla',
    password: 'dame',
    type: 'student'
}
```

### Response

#### 200 (OK)
> If successfully registered, endpoint will return HTTP response with status code and a body with a token and user's id, first name, last name, type and email address

##### Example Response
 ```javascript
{
    "data": {
        "message": "Welcome Damian",
        "user": {
            "id": 4,
            "username": "DameDolla",
            "First Name": "Damian",
            "Last Name": "Lillard",
            "email": "dame@blazers.com",
            "type": "student"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IkRhbWVEb2xsYSIsImlhdCI6MTU4Mjg2MDU4MCwiZXhwIjoxNTgyODY0MTgwfQ.AIE0cmqz1oTKte1XhIqU4m9935GWYxqqqhA6JHUyts4"
    }
}
 ```

#### 400 (Bad Request)
> If required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 401 (Unauthorized)
> If username is not found or password is incorrect, status 401 will be returned

#### 500 (Internal Error) 
> If there was a server error logging in the user, a response with status code 500 will be returned.

## Get All Professors 

HTTP request: GET

URL: /api/users/professors

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |


### Response 

#### 200 (OK)
 > If successful, endpoint will return HTTP response with an array of all professors

##### Example Response 

 ```javascript
{
    "data": {
        "professors": [
            {
                "id": 1,
                "First Name": "Harry",
                "Last Name": "Potter"
            },
            {
                "id": 2,
                "First Name": "Severus",
                "Last Name": "Snape"
            },
            {
                "id": 3,
                "First Name": "Albus",
                "Last Name": "Dumbledore"
            }
        ]
    }
}
```

#### 500 (Internal Error) 
 > If there was a server error retrieving the data, a response with status code 500 will be returned.


## Get Student List

HTTP request: GET

URL: /api/users/professor/:id/students

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Response 

#### 200 (OK)
> If successful, endpoint will return HTTP response with an array of the users students

##### Example Response 

 ```javascript
 {
    "data": {
        "students": [
            {
                "id": 1,
                "firstName": "Kobe",
                "lastName": "Bryant",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            },
            {
                "id": 2,
                "firstName": "Lebron",
                "lastName": "James",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            },
            {
                "id": 3,
                "firstName": "Damian",
                "lastName": "Lilliard",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            },
            {
                "id": 4,
                "firstName": "Anthony",
                "lastName": "Davis",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            },
            {
                "id": 5,
                "firstName": "Michael",
                "lastName": "Jordan",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            },
            {
                "id": 6,
                "firstName": "Magic",
                "lastName": "Johnson",
                "Prof First Name": "Harry",
                "Prof Last Name": "Potter"
            }
        ]
    }
}
```

#### 400 (Bad Request)
> If a user with the given id doesn't exist, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.


## Creating A New Student

HTTP Request: POST
URL: /api/users/professor/:id/students

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Body 

Name        | Type   | Required | Description                              |
------------|--------|----------| -----------------------------------------|
firstName   | String | Yes      | Student's first name                     | 
lastName    | String | Yes      | Student's last name                      |

### Response

#### 201 (Created)
 > If successful, endpoint will return HTTP response with a message and the new students id, first name, and last name

##### Example Response

```javascript
{
    "data": {
        "message": "New Student Successfully Created",
        "student": {
            "id": 23,
            "First Name": "Jimmy",
            "Last Name": "Butler"
        }
    }
}
```

#### 400 (Bad Request)
> If a user with the given id doesn't exist, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.

## Updating A New Student

HTTP Request: PUT
URL: /api/students/:id/

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Body 

Name        | Type   | Required | Description                              |
------------|--------|----------| -----------------------------------------|
firstName   | String | Yes      | Student's first name                     | 
lastName    | String | Yes      | Student's last name                      |

### Response

#### 200 (OK)
 > If successful, endpoint will return HTTP response with a message and the updated students id, first name, and last name

##### Example Response

```javascript
{
    "data": {
        "message": "Student Successfully Updated",
        "student": {
            "id": 23,
            "First Name": "Jimbo",
            "Last Name": "Butler"
        }
    }
}
```

#### 400 (Bad Request)
> If a user with the given id doesn't exist, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.

## Deleting A Student

HTTP Request: DELETE
URL: /api/students/:id

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Response

#### 200 (OK)
 > If successful, endpoint will return HTTP response with a message and the deleted students id, first name, and last name

##### Example Response

```javascript
{
    "data": {
        "message": "Student Successfully deleted",
        "student": {
            "id": 23,
            "First Name": "Jimmy",
            "Last Name": "Butler"
        }
    }
}
```

#### 400 (Bad Request)
> If a student with the given id doesn't exist, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.

## Get Single Student 

HTTP request: GET

URL: /api/students/:id

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |


### Response 

#### 200 (OK)
 > If successful, endpoint will return HTTP response with students id, first name, and last name

##### Example Response 

 ```javascript
 {
    "data": {
        "student": {
            "id": 3,
            "First Name": "Damian",
            "Last Name": "Lilliard"
        }
    }
}
```

#### 400 (Bad Request)
 > If a student with the given id doesn't exist OR required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
 > If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
 > If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
 > If there was a server error retrieving the data, a response with status code 500 will be returned.

 ## Get Student Project List

HTTP request: GET

URL: /api/students/:id/projects

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |


### Response 

#### 200 (OK)
 > If successful, endpoint will return HTTP response with project info, and students first and last name

##### Example Response 

 ```javascript
{
    "data": {
        "student": {
            "id": 4,
            "First Name": "Anthony",
            "Last Name": "Davis"
        },
        "projects": [
            {
                "id": 5,
                "Due Date": 1582952881294,
                "name": "Why the world ended",
                "notes": "",
                "completed": false
            },
            {
                "id": 6,
                "Due Date": 1583039281294,
                "name": "Coffe Meeting",
                "notes": "",
                "completed": false
            }
        ]
    }
}
```

#### 400 (Bad Request)
 > If a student with the given id doesn't exist OR required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
 > If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
 > If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
 > If there was a server error retrieving the data, a response with status code 500 will be returned.

 ## Get Project List

HTTP request: GET

URL: /api/projects

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Response 

#### 200 (OK)
> If successful, endpoint will return HTTP response with an array of all projects

##### Example Response 

 ```javascript
 {
    "data": {
        "projects": [
            {
                "id": 1,
                "name": "Ball out",
                "dueDate": 1582950338692,
                "notes": "",
                "completed": false,
                "firstName": "Kobe",
                "lastName": "Bryant"
            },
            {
                "id": 2,
                "name": "Do Something",
                "dueDate": 1583295938692,
                "notes": "",
                "completed": false,
                "firstName": "Kobe",
                "lastName": "Bryant"
            },
            {
                "id": 3,
                "name": "Create new technology",
                "dueDate": 1583036738692,
                "notes": "",
                "completed": false,
                "firstName": "Lebron",
                "lastName": "James"
            },
            {
                "id": 4,
                "name": "Learn Express",
                "dueDate": 1583209538692,
                "notes": "",
                "completed": false,
                "firstName": "Damian",
                "lastName": "Lilliard"
            },
            {
                "id": 5,
                "name": "Why the world ended",
                "dueDate": 1582950338692,
                "notes": "",
                "completed": false,
                "firstName": "Anthony",
                "lastName": "Davis"
            },
            {
                "id": 6,
                "name": "Coffe Meeting",
                "dueDate": 1583036738693,
                "notes": "",
                "completed": false,
                "firstName": "Anthony",
                "lastName": "Davis"
            },
        ]
    }
}
```

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.

## Get Single Project 

HTTP request: GET

URL: /api/projects/:id

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |


### Response 

#### 200 (OK)
 > If successful, endpoint will return HTTP response with project info, and students first and last name

##### Example Response 

 ```javascript
{
    "data": {
        "project": {
            "id": 3,
            "name": "Create new technology",
            "dueDate": 1583039281294,
            "notes": "",
            "completed": false,
            "First Name": "Lebron",
            "Last Name": "James"
        }
    }
}
```

#### 400 (Bad Request)
 > If a student with the given id doesn't exist OR required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
 > If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
 > If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
 > If there was a server error retrieving the data, a response with status code 500 will be returned.

 ## Creating A New Project

HTTP Request: POST
URL: /api/students/:id/projects

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Body 

Name        | Type    | Required | Description                              |
------------|---------|----------| -----------------------------------------|
name        | String  | Yes      | Name of the project                      | 
dueDate     | Integer | Yes      | Project due date(milliseconds)           |
notes       | String  | No       | Any notes about the project              |

### Example

```javascript
{
	"name": "Take over the world",
	"dueDate": 1583015361297
}
```

### Response

#### 201 (Created)
 > If successful, endpoint will return HTTP response with a message and the new project's info, and student's first and last name

##### Example Response

```javascript
{
    "data": {
        "message": "Project Successfully Created",
        "project": {
            "id": 23,
            "name": "Take over the world",
            "dueDate": 1583015361297,
            "notes": null,
            "completed": false,
            "First Name": "Lebron",
            "Last Name": "James"
        }
    }
}
```

#### 400 (Bad Request)
> If a student with the given id doesn't exist or required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.

## Deleting A Project

HTTP Request: DELETE
URL: /api/projects/:id

### Headers 

Name          | Type   |Required  | Description               |
------------- |--------|----------|---------------------------|
Content-Type  |String  | Yes      | Must be application/json  |
authorization |String  | Yes      | token received upon login |

### Response

#### 200 (OK)
 > If successful, endpoint will return HTTP response with a message and the deleted projects info

##### Example Response

```javascript
{
    "data": {
        "message": "Project Successfully Deleted",
        "project": {
            "id": 4,
            "name": "Learn Express",
            "dueDate": 1583209538692,
            "notes": "",
            "completed": true
            "First Name": "Damian",
            "Last Name": "Lilliard"
        }
    }
}
```

#### 400 (Bad Request)
> If a project with the given id doesn't exist, the endpoint will return an HTTP response with a status code of 400

#### 404 (Not Found)
> If the given token has expired the endpoint will return an HTTP response with a status code of 404

#### 401 (Unathorized)
> If no token is sent in header of the request the endpoint will return an HTTP response with a status code of 401

#### 500 (Internal Error) 
> If there was a server error retrieving the data, a response with status code 500 will be returned.










