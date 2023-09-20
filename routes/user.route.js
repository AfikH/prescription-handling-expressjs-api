import express from 'express';
import bcrypt from 'bcrypt';

import { insertUser } from '../database/user.js';
import { genToken } from '../utils/user.js';

const router = express.Router();

// register user
router.post('/register', async (req, res) => {
    let email = req.body.email || '';
    let password = req.body.password || '';
    let firstName = req.body.firstName || '';
    let lastName = req.body.lastName || '';

    if(!email || !password || !firstName || !lastName){
        return res.status(400).json({ok: false, message: 'Please fill in all form fields.'});
    }

    // hash password using bcrypt(auto generated salt).
    const hashedPassword = await bcrypt.hash(password, 12).then(hash => {
        return hash;
    }).catch(errors => {
        return false;
    });

    if(!hashedPassword){
        console.log('bcrypt password hash failed.')
        return res.status(400).json({ok: false, message: 'We\'re having a problem creating your account, please try again later.'});
    }

    const newUser = await insertUser(email, hashedPassword, firstName, lastName);

    if(!newUser){
        console.log('function insertUser failed.')
        return res.status(400).json({ok: false, message: 'We\'re having a problem creating your account, please try again later.'});
    }
    
    // set http cookie with jwt token containing user id
    res.cookie('token', genToken(newUser), {
        sameSite: "strict",
        secure: false,
        httpOnly: true
    })
    res.status(201).json({ok: true, message: 'Your account has been created.'});
});

// login user
router.post('/login', (req, res) => {

});

export default router;