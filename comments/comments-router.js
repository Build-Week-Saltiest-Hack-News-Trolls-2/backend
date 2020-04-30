const router = require('express').Router();
const Comments = require('./comments-model.js');
const auth = require('../auth/auth-middle');

//get all comments -- works
router.get('/', (req, res) => {
    console.log("token", req.decodedToken);
  Comments.find()
    .then(faves => {
      res.json(faves)
    })
    .catch(err => res.send(err));
});

//get all saved comments --
router.get('/faves', auth, (req, res) => {
    const { id } = req.decodedToken;
    // const id = req.params;
	Comments.findSaved(id)
		.then((comments) => res.status(200).json(comments))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

//get a specific comment -- works
router.get('/:id', (req, res) => {
    let { id } = req.params;
    Comments.findById(id)
    .then(faves => {
        res.json(faves);
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
router.post('/', validateComment, (req, res) => {
    Comments.add(req.body)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new comment' });
    })
})

//save comment to faves list
router.post('/faves', auth, (req, res) => {
    const commentID = req.body;
    const { id } = req.decodedToken;
    Comments.save(id, commentID)
        .then(() => res.status(201).json(faves))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        })
})



router.delete('/faves/:id', commentID, (req, res) => {
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

function validateComment (req, res, next) {
    console.log(`middleware validate comment ${req.body.saltiness}`)
    if(!req.body.saltiness){
        res.status(400).json({ message: 'comment does not have a salty rating' })
    }else{
      next()
    }
}

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
        next();
}

// function updateComment (req, res, next) {
//     console.log(`middleware update comment ${req.body.saved}`)
//     if(!req.body.saved){
//         res.status(400).json({ message: 'comment update not available' })
//     }else{
//       next()
//     }
// }

// function validateRelationship (req, res, next) {
//     console.log(`middleware validate ${req.body.commentID}`)
//     if(!req.body.commentID){
//         res.status(400).json({ message: 'Could not validate relationship' });
//     } else {
//       next()
//     }
// }

module.exports = router;