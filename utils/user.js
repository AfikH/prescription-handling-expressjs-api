import jwt from 'jsonwebtoken';

export const genToken = (userId) => {
    // TODO: get token secret from env variable.
    return jwt.sign({userId}, "ASDQWEASDQWE", {
        expiresIn: 60 * 15
    })
}