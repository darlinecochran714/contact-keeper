const jwt = require('jsonwebtoken');
const config = require('config');

// whenever you have a middlewear function, you have to use the next function which tells it to move onto the next thing
module.exports = function(req, res, next) {
    // get token from header
    // ket to token inside the header
    const token = req.header('x-auth-token')

    // check if not token
    if(!token){
        return res.status(401).json ({ msg: 'No token, authorization denied'})
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // payload goes into decoded
        req.user = decoded.user;
        next();
    } catch {
        res.status(401).json({ msg: 'token is not valid '})
    }
}