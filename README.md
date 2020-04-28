# **Saltiest Troll - Backend**

##Description
These databases create and store user accounts for the app, allow users to see a list of the saltiest comments, and allow users to save, view, and delete favorited comments.
Tables include: users, comments, faves

## **API User Guide**
|-|
|[Authentication Routes](##Authentication-Routes)|
|[Comments Routes](##Comments-Routes)|
|[Users Routes](##Users-Routes)|

## **Authentication-Routes**
==========================================================================
#### POST api/auth/register - create new user account
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

#### POST api/auth/login - authenticate user
Request Schema:
``` javascript
{
  username: "testinguser1", // string (required), must be unique
  password: "testing123!" // string (required) 
}
```

Response:

``` javascript
{
    "user": {
        "id": #,
        "username": "testinguser",
        "password": "password",
    },
    "token": "encrypted password"
}
```


### **Comments Routes** (saved comments are authorized user access only; ds api is public)
#### GET api/comments - see all comments
[back to top](#api-user-guide)
Response: [list of comment objects]


#### POST api/comments/faves/ - save a favorite comment to user's faves table
Request Schema:
```javascript
{ 
    "commentID": {comment id},  //required, unique,dynamic from save button
	"author": "comment username", //required
    "text": "comment content" , //required
    "saved": true, //required
    "userID": {user id} //required, dynamic from user info
}
```

#### GET api/comments/faves - see all favorite comments (this should be the user's list of saved comments)
Response:[list of comment objects]

#### GET api/comments/faves/:commentID - see a favorite comment
Request Schema: params
Response: {comment object}

#### DELETE api/comments/faves/:commentID - delete a favorite comment 
Request Schema: params
Response: deleted

## **Users Routes **-- accesses user database
### GET api/users/:id - see one username by user id
[back to top](#api-user-guide)
Request: params
Response: { username: "username" }

### DELETE api/users/:id - delete one user by user id
Request: params
Response: deleted