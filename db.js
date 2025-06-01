const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ecommerce-database.c0h2w6ciwaqa.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'YOUR_PASSWORD_HERE',
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to RDS MySQL as id ' + connection.threadId);
});

module.exports = connection;
