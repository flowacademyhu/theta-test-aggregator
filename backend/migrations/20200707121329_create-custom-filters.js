exports.up = (knex) => {
  return knex.schema.createTable('custom_filters', (table) => {
    table.increments('id').primary();
    table.string('name').unique();
    table.string('user_id');
    table.string('triggered_by');
    table.string('commit_hash');
    table.bigInteger('started_after').unsigned();
    table.bigInteger('started_before').unsigned();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('custom_filters');
};
