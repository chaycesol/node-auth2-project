
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user_marketing_1', password: 'password', department: '1' },
        {username: 'user_marketing_2', password: 'password', department: '1' },
        {username: 'user_marketing_3', password: 'password', department: '1' },
        {username: 'user_dev_1', password: 'password', department: '2' },
        {username: 'user_dev_2', password: 'password', department: '2' },
        {username: 'user_dev_3', password: 'password', department: '2' },
        {username: 'user_sales_1', password: 'password', department: '3' },
        {username: 'user_sales_2', password: 'password', department: '3' },
        {username: 'user_sales_3', password: 'password', department: '3' },
      ]);
    });
};
