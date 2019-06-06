
exports.seed = function(knex, Promise) {
      return knex('markets').insert([
       {name:'1st street market', countries_id: 1},
       {name:'2nd street market', countries_id: 2},
       {name:'3rd street market', countries_id: 3},
       {name:'4th street market', countries_id: 1},
       {name:'5th street market', countries_id: 2},
       {name:'6th street market', countries_id: 3},
      ]);
};
