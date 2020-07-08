exports.up = (knex) => {
  return knex.schema.createTable('custom_filters', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('user_id');
    table.string('triggered_by');
    table.string('commit_hash');
    table.string('status');
    table.bigInteger('started_after').unsigned();
    table.bigInteger('started_before').unsigned();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('custom_filters');
};
