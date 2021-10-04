const jwt = require('jsonwebtoken');

module.exports = function authenticate (req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token,"asdasd");
        req.user = decode;
        next();
    }
    catch(err){
        res.json({massage: "Invalid authentication"});
    }
}