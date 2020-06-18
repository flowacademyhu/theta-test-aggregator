exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 'user1',
      password_hash: '$2b$10$2xXuAtRXlEpOXzZexkTv2eL08ZBKI0/1IAzE07TgvLVTgP/2iswfe',
      email: 'abc@abc.com',
      git_user: 'teszt_admin',
      role: 'admin',
      notification: true
    },
    {
      id: 'user2',
      password_hash: '$2b$10$2xXuAtRXlEpOXzZexkTv2eL08ZBKI0/1IAzE07TgvLVTgP/2iswfe',
      email: 'abc@abc.com',
      git_user: 'teszt_elek1',
      role: 'user',
      notification: false
    },
    {
      id: 'user3',
      password_hash: '$2b$10$2xXuAtRXlEpOXzZexkTv2eL08ZBKI0/1IAzE07TgvLVTgP/2iswfe',
      email: 'abc@abc.com',
      git_user: 'teszt_elek2',
      role: 'user',
      notification: true
    },
    {
      id: 'user4',
      password_hash: '$2b$10$2xXuAtRXlEpOXzZexkTv2eL08ZBKI0/1IAzE07TgvLVTgP/2iswfe',
      email: 'abc@abc.com',
      git_user: 'teszt_elek3',
      role: 'user',
      notification: true
    }
  ]);
};
