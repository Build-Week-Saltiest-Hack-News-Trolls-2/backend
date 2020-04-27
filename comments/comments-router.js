const router = require('express').Router();
const Comments = require('./comments-model.js');

//get all comments
router.get('/', (req, res) => {
  Comments.find()
    .then(faves => {
      res.json(faves)
    })
    .catch(err => res.send(err));
});

//get all saved comments
router.get('/faves', (req, res) => {
    //get userID from logged-in user
    Comments.findSaved(userID)
      .then(faves => {
        res.json(faves);
      })
      .catch(err => res.send(err))
});

//get a specific comment
router.get('/:id', commentID, (req, res) => {
    const { id } = req.params;
    Comments.findById(id)
    .then(faves => {
        if (faves) {
            res.json(faves);
        } else {
            res.status(404).json({ message: 'Could not find the comment with given id.' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to get comment' });
    })
});

//edit a specific comment
router.put('/:id', commentID, (req, res) => {
    const { id } = req.params
    Comments.findById(id)
    .then(comment => {
        if (comment) {
            Comments.update(id, req.body.saved)
            .then(updatedComment => {
                res.json(updatedComment)
        })
        } else {
            res.status(404).json({ message: 'Could not find comment with given id' });
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update comment' });
    })
})

//add new comment
// router.post('/', validateComment, (req, res) => {
//     Comments.add(req.body)
//     .then(comment => {
//         res.status(201).json(comment)
//     })
//     .catch (err => {
//         console.log(err)
//         res.status(500).json({ message: 'Failed to create new comment' });
//     })
// })

//save comment to faves list
router.post('/:id', validateRelationship, (req, res) => {
    const { id } = req.params; 
    Comments.findById(id)
    .then(comment => {
        if (comment) {
            Comments.save(req.body, id)
            .then(comment => {
                res.status(201).json(comment)
            })
        } else {
            res.status(404).json({ message: 'Could not find comment with given task id.' })
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new comment relationship' });
    })
})



router.delete('/:id', commentID, (req, res) => {
    const { id } = req.params;
  
    Comments.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find comment with given id' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete comment' })
    })
})

// function validateComment (req, res, next) {
//     console.log(`middleware validate comment ${req.body.saltiness}`)
//     if(!req.body.saltiness){
//         res.status(400).json({ message: 'comment does not have a salty rating' })
//     }else{
//       next()
//     }
// }

function commentID (req, res, next) {
    const { id } = req.params
    Comments.findById(id)
        .then(result => {
            if(result && Object.entries(result).length){
                next()
            }else {
                res.status(400).json({ message: 'comment does not exist' })
            }
        })
}

function updateComment (req, res, next) {
    console.log(`middleware update comment ${req.body.saved}`)
    if(!req.body.saved){
        res.status(400).json({ message: 'comment update not available' })
    }else{
      next()
    }
}

function validateRelationship (req, res, next) {
    console.log(`middleware validate project ${req.body.userID}`)
    if(!req.body.userID){
        res.status(400).json({ message: 'Did not send userID, commentID' });
    } else {
      next()
    }
}

module.exports = router;