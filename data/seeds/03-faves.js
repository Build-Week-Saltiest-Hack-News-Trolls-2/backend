
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('faves').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('faves').insert([
        {userID: 1, commentID: 1}
        // {faveID: 1, commentID: 242, author: "bob333", text: "this ducks", saltiness: 1, saved: false},
        // {faveID: 2, commentID: 3283, author: "bob333", text: "blah blah", saltiness: 2, saved: true,}
      ]);
    });
};
