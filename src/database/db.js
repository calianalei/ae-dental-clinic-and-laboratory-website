import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'ae-dentalcliniclaboratory-db.cde2ieq6o8w9.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',  // Use "admin" as the username
    password: 'Marchfour_2004',  // Replace with your actual password
    database: 'aedcl_db'
});


db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to RDS MySQL Database');
    }
});

export default db;