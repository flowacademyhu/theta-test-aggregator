
exports.up = (knex) => {
  return knex.schema.createTable('simulation-results', (table) => {
    table.string('id', [50]).primary();
    table.string('triggered_by', [50]);
    table.string('branch_name', [250]);
    table.integer('start_timestamp').unsigned();
    table.integer('end_timestamp').unsigned();
    table.string('commit_hash', [50]);
    table.string('status', [50]);
    table.string('error_message', [250]);
    table.string('short_description', [250]);
    table.json('payload_data');
    table.text('payload_text');
    table.integer('sequence_number');
    table.specificType('invalid', 'tinyint');
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('simulation-results');
};
