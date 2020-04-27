const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets')

module.exports = (req, res, next) => {
  const { auth } = req.headers

  if (auth) {
    jwt.verify(auth, jwtSecret, (err, decodedToken) => {
    if(err){
      res.status(401).json({ message: 'Invalid username or password' })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
  } else {
    res.status(400).json({ message: 'No credentials provided' })
  }
}