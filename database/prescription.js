import { pool } from "./db.js";

// handle mysql insert new prescription
export const insertPrescription = (prescribedDrugs, status, doctorId, consumerId, expiryDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO prescriptions (prescription_prescribed_drugs, prescription_status, prescription_doctor, prescription_consumer, prescription_expiry_date) VALUES (?, ?, ?, ?, ?)', [
            prescribedDrugs,
            status,
            doctorId,
            consumerId,
            expiryDate
        ], (error, results, fields) => {
            if(error) return reject(error);
            resolve(results.insertId);
        });
    })
}

// handle mysql get specific user prescriptions
export const getUserPrescriptions = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM prescriptions WHERE prescription_consumer=?',
        [userId],
        (error, results, fields) => {
            if(error) return reject(error);
            resolve(results);
        });
    })
}