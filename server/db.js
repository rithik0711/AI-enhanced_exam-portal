const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Revathy@2509',
  database: 'mini_project'
});

module.exports = pool.promise();
