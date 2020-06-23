exports.up = (knex) => {
  return knex.schema.alterTable('simulation_results', table => {
    table.bigInteger('start_timestamp').unsigned().alter();
    table.bigInteger('end_timestamp').unsigned().alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable('simulation_results', table => {
    table.integer('start_timestamp').unsigned().alter();
    table.integer('end_timestamp').unsigned().alter();
  });
};
