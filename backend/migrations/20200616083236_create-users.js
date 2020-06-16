exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('password_hash');
    table.string('email');
    table.integer('git_user');
    table.enu('role', ['admin', 'user']).defaultTo('user');
    table.boolean('notification');
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
