
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'testone', password: 'testtestone'},
        {id: 2, username: 'testtwo', password: 'testtesttwo'},
        {id: 3, username: 'testthree', password: 'testtestthree'}
      ]);
    });
};
