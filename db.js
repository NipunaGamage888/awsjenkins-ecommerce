const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ecommerce-database.c0h2w6ciwaqa.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Blahbleh12345?',
  database: 'ecommerce-database'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to RDS MySQL as id ' + connection.threadId);
});

module.exports = connection;
