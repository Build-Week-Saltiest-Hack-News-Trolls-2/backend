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

//ALL COMMENTS IN DS DATABASE
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


//SAVED COMMENTS
function findSaved(userID) {
  return db('faves')
    .where({userID})
}

function save(userID, commentID){
  return db('faves')
      .insert({ ...userID, commentID: commentID })
}

// function add(comment){
//   return db('comments')
//       .insert(comment, 'id')
// }

function remove(commentID){
    return db('faves')
        .where({ commentID })
        .del()
}