
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user_marketing_1', password: 'password', department: 'marketing' },
        {username: 'user_marketing_2', password: 'password', department: 'marketing' },
        {username: 'user_marketing_3', password: 'password', department: 'marketing' },
        {username: 'user_dev_1', password: 'password', department: 'engineering' },
        {username: 'user_dev_2', password: 'password', department: 'engineering' },
        {username: 'user_dev_3', password: 'password', department: 'engineering' },
        {username: 'user_sales_1', password: 'password', department: 'sales' },
        {username: 'user_sales_2', password: 'password', department: 'sales' },
        {username: 'user_sales_3', password: 'password', department: 'sales' },
      ]);
    });
};
