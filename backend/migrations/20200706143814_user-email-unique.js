exports.up = (knex) => {
  return knex.schema.alterTable('users', table => {
    table.string('email').unique().alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable('users', table => {
    table.string('email').alter();
  });
};
