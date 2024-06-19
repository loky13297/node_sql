const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'sql_task',
  username: 'loksai',
  password: 'doodleblue@123',
  host: 'localhost',  // Or your database host
  dialect: 'mysql',  // Or 'mysql', 'sqlite', etc.
});

module.exports = sequelize;