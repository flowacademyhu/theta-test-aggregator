exports.seed = async (knex) => {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('users').del();
  await knex.raw('ALTER TABLE ' + 'users' + ' AUTO_INCREMENT = 1');
  await knex('users').insert([
    {
      id: 'user1',
      password_hash: '$2b$10$AZiLunXY1C4QUA.FvoW4peFJWeaIqAJ8BQXs2xnJyLQwNZ6bTcjQS',
      email: 'user1@email.com',
      git_user: 'gituser1',
      role: 'admin',
      notification: true
    },
    {
      id: 'user2',
      password_hash: '$2b$10$Q2H0WN7siI9ABEHccS2sUe/HNcSJ1YBqGD/4ib0hAqxTFMUNHAd/C',
      email: 'user2@email.com',
      git_user: 'gituser2',
      role: 'admin',
      notification: false
    },
    {
      id: 'user3',
      password_hash: '$2b$10$Q2H0WN7siI9ABEHccS2sUe/HNcSJ1YBqGD/4ib0hAqxTFMUNHAd/C',
      email: 'user3@email.com',
      git_user: 'gituser3',
      role: 'user',
      notification: true
    },
    {
      id: 'user4',
      password_hash: '$2b$10$Q2H0WN7siI9ABEHccS2sUe/HNcSJ1YBqGD/4ib0hAqxTFMUNHAd/C',
      email: 'user4@email.com',
      git_user: 'gituser4',
      role: 'user',
      notification: false
    },
    {
      id: 'user5',
      password_hash: '$2b$10$Q2H0WN7siI9ABEHccS2sUe/HNcSJ1YBqGD/4ib0hAqxTFMUNHAd/C',
      email: 'user5@email.com',
      git_user: 'gituser5',
      role: 'user',
      notification: true
    },
    {
      id: 'user6',
      password_hash: '$2y$12$tc0qtvnQ2p7mII6IFDUupuncAMmHHcWudKFBZpQxLGZJXbPBrUocm',
      email: 'hajnal.andor1993@gmail.com',
      git_user: 'test_admin',
      role: 'admin',
      notification: true
    }
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
