exports.up = (knex) => {
  return knex.schema.createTable('statistics', (table) => {
    table.increments('id');
    table.bigInteger('start_timestamp').unsinged();
    table.string('method');
    table.string('endpoint');
    table.float('measurement');
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('statistics');
};
