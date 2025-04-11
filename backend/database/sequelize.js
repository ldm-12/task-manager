const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const database = env == 'test' ? 'task_manager_test' : 'task_manager';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'the_password',
  database,
  logging: false
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch(err => {
    console.error('error connecting to database:', err);
  });

module.exports = sequelize;
