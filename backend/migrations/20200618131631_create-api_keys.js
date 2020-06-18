exports.up = (knex) => {
  return knex.schema.createTable('api_keys', (table) => {
    table.increments('id');
    table.string('key');
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('expires_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('api_keys');
};
