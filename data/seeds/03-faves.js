
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('faves').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('faves').insert([
        {userID: 5, commentID: 242, author: "bob333", text: "this ducks", saltiness: 1, saved: false},
        {userID: 5, commentID: 3283, author: "bob333", text: "blah blah", saltiness: 2, saved: true,}
      ]);
    });
};
