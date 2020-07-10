exports.seed = async (knex) => {
  await knex('statistics').del();
  await knex.raw('ALTER TABLE ' + 'statistics' + ' AUTO_INCREMENT = 1');
  await knex('statistics').insert([
    {
      id: 1,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 55321133133321,
      invalid: 0
    },
    {
      id: 2,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 1122132131,
      invalid: 0
    },
    {
      id: 3,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 3212312321,
      invalid: 0
    },
    {
      id: 4,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 4241412432,
      invalid: 0
    },
    {
      id: 5,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 5533432,
      invalid: 0
    },
    {
      id: 6,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 1321321321,
      invalid: 0
    },
    {
      id: 7,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 23123213211121,
      invalid: 0
    },
    {
      id: 8,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 5532112331434,
      invalid: 0
    },
    {
      id: 9,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 9234344332,
      invalid: 0
    },
    {
      id: 10,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 3234344313232,
      invalid: 0
    },
    {
      id: 11,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 88221433443,
      invalid: 0
    },
    {
      id: 12,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/transaction',
      measurement: 9234323213342,
      invalid: 0
    },
    {
      id: 13,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 55321132321,
      invalid: 0
    },
    {
      id: 14,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 32131231,
      invalid: 0
    },
    {
      id: 15,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 1234567803,
      invalid: 0
    },
    {
      id: 16,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 23112412432,
      invalid: 0
    },
    {
      id: 17,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 55334323231,
      invalid: 0
    },
    {
      id: 18,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 13243243242,
      invalid: 0
    },
    {
      id: 19,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 23113211121,
      invalid: 0
    },
    {
      id: 20,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 3332112331434,
      invalid: 0
    },
    {
      id: 21,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 88134344332,
      invalid: 0
    },
    {
      id: 22,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 81234433232,
      invalid: 0
    },
    {
      id: 23,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 772211443,
      invalid: 0
    },
    {
      id: 24,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'GET',
      endpoint: '/api/admin/feeschedule',
      measurement: 81323213342,
      invalid: 0
    },
    {
      id: 25,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 33421133133321,
      invalid: 0
    },
    {
      id: 26,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 223422132131,
      invalid: 0
    },
    {
      id: 27,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 4212312321,
      invalid: 0
    },
    {
      id: 28,
      simulation_result_id: '008f91bd-28b1-4cb0-99ad-b426dc56f811',
      start_timestamp: 1593429989059997000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 5341412432,
      invalid: 0
    },
    {
      id: 29,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 5533432443,
      invalid: 0
    },
    {
      id: 30,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 121321321,
      invalid: 0
    },
    {
      id: 31,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 4433213211121,
      invalid: 0
    },
    {
      id: 32,
      simulation_result_id: '70c0268d-569f-4143-bdff-c81caee4fbcf',
      start_timestamp: 1594530993120895000,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 4632112331434,
      invalid: 0
    },
    {
      id: 33,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 8234344333,
      invalid: 0
    },
    {
      id: 34,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 554344313232,
      invalid: 0
    },
    {
      id: 35,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 77221433443,
      invalid: 0
    },
    {
      id: 36,
      simulation_result_id: '67eba2b6-efd4-451e-be0a-3ee7f041790c',
      start_timestamp: 1595883798700884500,
      method: 'POST',
      endpoint: '/api/token',
      measurement: 32334323213342,
      invalid: 0
    }
  ]);
};