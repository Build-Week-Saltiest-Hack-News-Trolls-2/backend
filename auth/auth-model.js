const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  get,
  findBy,
  add,
  remove,
};

//works
function get() {
  return db('users');
};

//works
function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}

//works
function add(user) {
  return db('users')
    .insert(user)
    .then(user =>{
        return(user)
    });
};

//works
function remove(id) {
  return db('users')
    .where('id', id)
    .del();
};
