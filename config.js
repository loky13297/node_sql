const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'sql_task',
  username: 'loksai',
  password: 'doodleblue@123',
  host: 'localhost', 
  dialect: 'mysql', 
});

module.exports = sequelize;