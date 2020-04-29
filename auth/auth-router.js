const router = require('express').Router();
const bcrypt = require('bcrypt');
const Auth = require('./auth-model');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

//works
router.get('/', (req, res) => {
  Auth.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  });
})


//works
router.post('/register', validate, (req, res) => {
    let user = req.body; 
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    Auth.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'uh oh' });
      });
  });

//works
router.post('/login', validate, (req, res) => {
    let { username, password } = req.body;
    Auth.findBy({ username })
      .first()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = makeToken(user)
            res.status(200).json({
              message: `Welcome ${user.username}!, have a token...`, token});
        } else {
          res.status(401).json({ message: "Invalid login" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'uh oh' });
      });
  });

  function validate(req, res, next) {
    if(req.body.password && req.body.username){
      next()
    }else{
      res.status(500).json({message: "enter a username and password"})
    }
  }

  function makeToken (user) {
    const payload = {
      subject: user.id,
      username: user.username,
      user_type: user.user_type
    }
    const options = {
      expiresIn: '2h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
  }

module.exports = router;
