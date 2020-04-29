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
};

function findById(commentID) {
  return db('comments')
    .where( 'commentID', commentID )
    .first();
}

function add(comment){
  return db('comments')
    .insert(comment)
    .then(comment => {
      return(comment)
    });
};

//SAVED COMMENTS
function findSaved() {
  return db('faves')
      // .join("faves", "comments.id", "faves.commentID")
      .select(
        "comments.ID",
        "comments.author",
        "comments.text",
        "comments.saltiness"
      )
  }

function save(userID, commentID){
    return db("faves").insert({ userID, commentID });
  }

function remove(userID, commentID){
    return db('faves')
		.where({ userID, commentID })
		.del()
		.then(() => findById({ id: commentID }));
}