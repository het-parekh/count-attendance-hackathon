const jwt = require('jsonwebtoken');
const tokens = require('../models/blacklistedtoken');
module.exports.verifyjwtoken = (req, res, next) => {
    var token;
    if (req.cookies !== null) {
        token = req.cookies.token;
    }
    if (typeof token === 'undefined' || !token) {
        return res.status(401).send({ auth: false, message: 'no token provided.' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).send({ auth: false, message: 'token authentication failed.' });
            }
            else {
                var blacktoken = await tokens.findOne({ token: token });
                if (blacktoken) {
                    return res.status(401).send({ auth: false, message: 'token authentication failed.' });
                }
                req._user = decode.user;
                next();
            }
        })
    }
}