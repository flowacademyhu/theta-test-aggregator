exports.up = (knex) => {
  return knex.schema.createTable('statistics', (table) => {
    table.increments('id').primary();
    table.string('simulation_result_id', [50]);
    table.bigInteger('start_timestamp').unsigned();
    table.string('method');
    table.string('endpoint');
    table.float('measurement').unsigned();
    table.boolean('invalid').defaultTo(false);
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.foreign('simulation_result_id').references('id').inTable('simulation_results');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('statistics');
};
