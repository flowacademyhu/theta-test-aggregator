exports.seed = async (knex) => {
  await knex('api_keys').del();
  await knex.raw('ALTER TABLE ' + 'api_keys' + ' AUTO_INCREMENT = 1');
  await knex('api_keys').insert([
    {
      key: '25334dfa-2808-4c1b-a9a4-9c9d744851ba',
      created_at: '2020-06-23 12:42:35',
      expires_at: '2520-06-23 12:42:35'
    },
    {
      key: 'f5bbb2de-825a-4c38-bf5b-c02d1038dbf9',
      created_at: '2020-06-24 11:24:34',
      expires_at: '2020-07-24 11:24:34'
    },
    {
      key: '969b5a2e-68d5-4c80-974d-6b10ea4cbadb',
      created_at: '2020-06-25 09:32:34',
      expires_at: '2020-07-25 09:32:34'
    },
    {
      key: '8e312c0d-0a40-4ca6-8f4e-b4d93a82f7de',
      created_at: '2020-06-25 09:32:34',
      expires_at: '2020-06-25 09:32:34'
    }
  ]);
};
