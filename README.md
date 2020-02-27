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

Name       | Type   | Required | Description                              |
-----------|--------|----------| -----------------------------------------|
firstName  | String | Yes      | User's first name                        |
lastName   | String | No       | User's last name                         |
email      | String | Yes      | User's email address                     |
username   | String | Yes      | User's desired username(must be unique)  |
password   | String | Yes      | User's password(must be at least 6 chars)|

### Example 

```javascript
{
    firstName: 'Severus',
    lastName: 'Snape',
    email: 'potionsmaster@hogwarts.com',
    username: 'SlytherinPrince',
    password: 'i<3Lily'
}
```

### Response

#### 201 (Created)
 > If successfully registered, endpoint will return HTTP response with status code and a body with a token, user's id, email address, username, type, and welcome message

##### Example Response

```javascript
{
    "data": {
        "message": "Welcome Severus",
        "user": {
            "id": 4,
            "username": "SlytherinPrince",
            "First Name": "Severus",
            "Last Name": "Snape",
            "email": "potionsmaster@hogwarts.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IlNseXRoZXJpblByaW5jZSIsImlhdCI6MTU4MjgyODAzNCwiZXhwIjoxNTgyODMxNjM0fQ.A-6O41sOpxL4Bzsw-aLVMvAuhECGtCWvarHxjMNtkQw"
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

### Example 

```javascript
{
    username: 'SlytherinPrince',
    password: 'i<3Lily'
}
```

### Response

#### 200 (OK)
> If successfully registered, endpoint will return HTTP response with status code and a body with a token and user's id, first name, and email address

##### Example Response
 ```javascript
 {
    "data": {
        "message": "Welcome Severus",
        "user": {
            "id": 4,
            "username": "SlytherinPrince",
            "First Name": "Severus",
            "Last Name": "Snape",
            "email": "potionsmaster@hogwarts.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IlNseXRoZXJpblByaW5jZSIsImlhdCI6MTU4MjgyNzc1MCwiZXhwIjoxNTgyODMxMzUwfQ.UTERho621Dfw3i478kcMzok18o3i-dPIdG2by2MB7TM"
    }
}
 ```

#### 400 (Bad Request)
> If required information is missing, the endpoint will return an HTTP response with a status code of 400

#### 401 (Unauthorized)
> If username is not found or password is incorrect, status 401 will be returned

#### 500 (Internal Error) 
> If there was a server error logging in the user, a response with status code 500 will be returned.


## Get Student List

HTTP request: GET

URL: /api/users/:id/students

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


## Creating A New Student

HTTP Request: POST
URL: /api/users/:id/students

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








