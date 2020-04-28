const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
}

function find() {
  return db('users').select('id', 'username', 'password')
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id)
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first()
    .select('username')
}

function remove(id) {
  return db('users')
  .where('id', id)
  .del()
}