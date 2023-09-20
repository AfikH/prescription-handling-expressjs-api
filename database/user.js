import { pool } from "./db.js";

// handle mysql insert new user
export const insertUser = (email, password, firstName, lastName) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (user_email, user_password, user_first_name, user_last_name) VALUES (?, ?, ?, ?)', [
            email,
            password,
            firstName,
            lastName
        ], (error, results, fields) => {
            if(error) return reject(error);
            resolve(results.insertId);
        });
    })
}