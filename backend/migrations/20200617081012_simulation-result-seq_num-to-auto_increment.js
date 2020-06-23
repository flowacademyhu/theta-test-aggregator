exports.up = (knex) => {
  return knex.schema.raw('ALTER TABLE simulation_results MODIFY sequence_number INT UNSIGNED UNIQUE AUTO_INCREMENT');
};

exports.down = (knex) => {
  return knex.schema.raw('ALTER TABLE simulation_results MODIFY sequence_number INT UNSIGNED UNIQUE');
};
