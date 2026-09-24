require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'assignment5',
    host:  '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  }
};
