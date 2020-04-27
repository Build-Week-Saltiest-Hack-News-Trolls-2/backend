# **Saltiest Troll - Backend**

##Description
These databases create and store user accounts for the app, allow users to see a list of the saltiest comments, and allow users to save, view, and delete favorited comments.
Tables include: users, comments, faves

##API User Guide
|-|
|[Authentication Routes](#Authentication-Routes)|
|[Comments Routes](#Comments-Routes)|

###Authentication Routes

#### POST api/users/register - create new user account
[back to top](#api-user-guide)
Request Schema:

```javascript
{
  username: "testinguser1", // string (required), must be unique
  password: "testing123!" // string (required) 
}
```

Response:

```javascript
{
    id: #,
    username: "testinguser",
    password: "encrypted string"
}
```

#### POST api/users/login - authenticate user
[back to top](#api-user-guide)
Request Schema:

{
  username: "testinguser1", // string (required), must be unique
  password: "testing123!" // string (required) 
}


Response:

```javascript
{
    "user": {
        "id": #,
        "username": "testinguser",
        "password": "password",
    },
    "token": "encrypted password"
}
```



#### DELETE api/users/:id - delete account by userID
[back to top](#api-user-guide)
Request Schema:
Response:


###Comments Routes
#### GET api/comments - see all comments
[back to top](#api-user-guide)
Request Schema:
Response:

#### GET api/comments/:author - get comments by author username
[back to top](#api-user-guide)
Request Schema:
Response:

#### POST api/comments/faves/:id - save a favorite comment
[back to top](#api-user-guide)
Request Schema:
Response:

#### GET api/comments/faves - see all favorite comments
[back to top](#api-user-guide)
Request Schema:
Response:

#### GET api/comments/faves/:id - see a favorite comment
[back to top](#api-user-guide)
Request Schema:
Response:

#### DELETE api/comments/faves/:id - delete a favorite comment 
[back to top](#api-user-guide)
Request Schema:
Response:
