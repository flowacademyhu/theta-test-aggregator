exports.up = (knex) => {
  return knex.schema.alterTable('statistics', table => {
    table.bigInteger('measurement').unsigned().alter();
  });  
};

exports.down = (knex) => {
  return knex.schema.alterTable('statistics', table => {
    table.float('measurement').unsigned().alter();
  });
};
