exports.up = (knex) => {
  return knex.schema.alterTable('api_keys', table => {
    table.datetime('expires_at').defaultTo(knex.fn.now()).alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable('api_keys', table => {
    table.timestamp('expires_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).alter();
  });
};
