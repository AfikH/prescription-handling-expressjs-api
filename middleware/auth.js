export default auth = (req, res, next) => {
    const token = req.headers['access-token'];

    try{
        if(!token){
            if(err) throw new Error();
        }
        
        // TODO: get token secret from env variable.
        jwt.verify(token, "ASDQWEASDQWE", (err, decoded) => {
            if(err) throw new Error();
            req.userId = decoded.id;
            next();
        });
    }catch(errors){
        res.status(400).json({ message: 'Not authorized.' });
    }
}