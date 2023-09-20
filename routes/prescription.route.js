import express from 'express';

import { insertPrescription, getUserPrescriptions } from '../database/prescription.js';

const router = express.Router();

// add new prescription(requires auth: logged in + doctor role)
router.post('/', async (req, res) => {
    const newPrescription = await insertPrescription();
});

// get specific user prescriptions
router.get('/user/:prescription_id', async (req, res) => {
    const prescriptions = await getUserPrescriptions(req.params.prescription_id);
    if(!prescriptions){
        console.log('function insertUser failed.')
        return res.status(400).json({ok: false, message: 'Couldn\'t get user prescriptions.'});
    }
    res.status(200).json({ok: true, prescriptions});
});

// update specific prescription by presription id
router.put('/update_status/:prescription_id', (req, res) => {

});

export default router;