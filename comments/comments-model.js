const db = require('../data/dbConfig.js')

module.exports = {
  find,
  findBy,
  update,
  add,
  findById,
  save,
  findSaved,
  remove
};

function find() {
  return db('comments')
}

function findBy(filter) {
  return db('comments').where(filter);
}

function update (commentID, saved){
    return db('comments')
      .where({ commentID }) 
      .update(saved)

}

function findById(commentID) {
  return db('comments')
    .where({ commentID })
    .first();
}

function add(comment){
  return db('comments')
    .insert(comment, 'id')
    .then((id) => {findById(id)})
}

//SAVED COMMENTS
function findSaved() {
  return db('faves')
  .join("faves", "comments.id", "faves.comment_id")
  .select(
    "comments.id",
    "comments.author",
    "comments.text",
    "comments.saltiness",
    "comments.saved"
  )
}

function save(userID, commentID){
  return db('faves')
      .insert(userID, commentID)
}

function remove(userID, commentID){
    return db('faves')
        .where({ userID, commentID })
        .del()
        .then(()=> {return db('faves')})
}