const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  get,
  findBy,
  add,
  remove,
};


function get() {
  return db('users');
};

function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}


function add(user) {
  return db('users')
    .insert(user)
    .then(user =>{
        return(user)
    });
};

//not required
function remove(id) {
  return db('users')
    .where('id', id)
    .del();
};
