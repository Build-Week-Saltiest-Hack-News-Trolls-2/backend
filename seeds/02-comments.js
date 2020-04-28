
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, author: 'writingwriter', text: "yadda", saltiness: 5, saved: false},
        {id: 2, author: 'writingwriter', text: "something else", saltiness: 4, saved: true},
        {id: 3, author: 'jane', text: "yaddayadda", saltiness: 2, saved: true},
      ]);
    });
};
