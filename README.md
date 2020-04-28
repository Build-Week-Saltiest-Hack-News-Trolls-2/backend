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



###Comments Routes (saved comments are authorized user access only; ds api is public)
#### GET api/comments - see all comments
[back to top](#api-user-guide)
Request Schema:
Response:

#### GET api/comments/:author - get comments by author username --put into search function instead
[back to top](#api-user-guide)


#### POST api/comments/faves/:id - save a favorite comment
[back to top](#api-user-guide)
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
[back to top](#api-user-guide)
Response:[list of comment objects]

#### GET api/comments/faves/:id - see a favorite comment
[back to top](#api-user-guide)
Request Schema:
Response: {comment object}

#### DELETE api/comments/faves/:id - delete a favorite comment 
[back to top](#api-user-guide)
Request Schema:
Response:
