const db = require("../data/dbConfig.js")

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
  return db("comments")
}

function findBy(filter) {
  return db("comments").where(filter);
}

function update (commentID, saved){
    return db("comments")
      .where({ commentID }) 
      .update(saved)
};

function findById(id) {
  return db("comments")
    .where( "id", id )
    .first();
}

function add(comment){
  return db("comments")
    .insert(comment)
    .then(comment => {
      return(comment)
    });
};

//SAVED COMMENTS
function findSaved(id) {
  return db("faves as f")
      .join("users as u", "f.userID", "u.id")
      .where( "u.id", id)
  //     .select(
  //       "commentID",
  //     )
  }

function save(id, comment){
    return db("faves as f")
    // .join("users as u", "f.userID", "u.id")
      // .select(
      //   "comments.ID",
      //   "comments.author",
      //   "comments.text",
      //   "comments.saltiness"
      // )
      // .where( "u.id", id )
      .insert(comment)
      .then(comment => {
        return(comment)
      })
  }

function remove(id, commentID){
    return db("faves")
    .join("users as u", "f.userID", "u.id")
		.where({ userID, commentID })
		.del()
		.then(() => findById({ id: commentID }));
}