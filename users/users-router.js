const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Could not find user with given id' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;