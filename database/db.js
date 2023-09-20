import mysql from 'mysql';

// create mysql pool
// TODO: get databse connection info from env variable.
export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db_prescription_handling'
});