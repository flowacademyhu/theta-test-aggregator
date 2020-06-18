exports.seed = async (knex) => {
  await knex('simulation_results').del();
  await knex.raw('ALTER TABLE ' + 'simulation_results' + ' AUTO_INCREMENT = 1');
  await knex('simulation_results').insert([
    {
      id: 'test1',
      triggered_by: 'teszt_elek1',
      branch_name: 'teszt',
      start_timestamp: 159230331,
      end_timestamp: 159230332,
      commit_hash: '012b734f21ddec313ae0db17d52048999dd69908',
      status: 'SUCCES',
      error_message: '',
      short_description: '',
      payload_text: 'test: succes',
      invalid: 0
    },
    {
      id: 'test2',
      triggered_by: 'teszt_elek2',
      branch_name: 'teszt',
      start_timestamp: 159230333,
      end_timestamp: 159230334,
      commit_hash: '012b734f21ddec313ae0db17d52048999dd69908',
      status: 'FAILED',
      error_message: 'error',
      short_description: 'error',
      payload_text: 'test: failed',
      invalid: 0
    },
    {
      id: 'test3',
      triggered_by: 'teszt_elek3',
      branch_name: 'teszt',
      start_timestamp: 159230335,
      end_timestamp: 159230336,
      commit_hash: '012b734f21ddec313ae0db17d52048999dd69908',
      status: 'ERROR',
      error_message: 'error',
      short_description: 'error',
      payload_text: 'test: error',
      invalid: 0
    },
    {
      id: 'test4',
      triggered_by: 'teszt_elek1',
      branch_name: 'teszt',
      start_timestamp: 159230337,
      end_timestamp: 159230338,
      commit_hash: '012b734f21ddec313ae0db17d52048999dd69908',
      status: 'ERROR',
      error_message: 'error',
      short_description: 'error',
      payload_text: 'test: error',
      invalid: 1
    },
    {
      id: 'test5',
      triggered_by: 'teszt_elek2',
      branch_name: 'teszt',
      status: 'UNKNOWN',
      invalid: 0
    }
  ]);
};
