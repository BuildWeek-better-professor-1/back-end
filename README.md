# Lambda School Better Professor API

## Base URL
** Need Base URL upon delpoying **

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
type       | String | Yes      | User's type(professor/student)           |
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
    password: 'i<3Lily',
    type: 'student'
}
```

### Response

#### 201 (Created)
 > If successfully registered, endpoint will return HTTP response with status code and a body with a token, user's id, email address, username, type, and welcome message

 #### 400 (Bad Request)
 > If required information is missing, the endpoint will return an HTTP response with a status code of 400

 #### 500 (Internal Error) 
 > If there was a server error registering the user, a response with status code 500 will be returned.

## Log In A User
----------------

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

  #### 400 (Bad Request)
 > If required information is missing, the endpoint will return an HTTP response with a status code of 400

 #### 401 (Unauthorized)
 > If username is not found or password is incorrect, status 401 will be returned

 #### 500 (Internal Error) 
 > If there was a server error logging in the user, a response with status code 500 will be returned.








