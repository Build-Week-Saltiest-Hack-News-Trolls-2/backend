
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('faves').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('faves').insert([
        {faveID: 1, commentID: 242, author: "bob333", text: "this ducks", saved: false, userID: 1},
        {faveID: 2, commentID: 3283, author: "bob333", text: "blah blah", saved: true, userID: 3}
      ]);
    });
};
