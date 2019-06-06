
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('countries').insert([
    {name:'Kenya'},
    {name:'Rewanda'},
    {name:'Uganda'},
  ])
};
