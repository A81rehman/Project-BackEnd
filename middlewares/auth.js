const jwt = require("jsonwebtoken");
let config = require("config");
let {Users} = require("../models/user");
async function  auth(req,res,next) {
    let token = req.headers('x-auth-token');
    if(!token) return res.status(400).send('Token missing');
    try {
        let User = jwt.verify(token,config.get("jwtPrivateKey"));
        req.User =await Users.findById(User._id);

    } catch (error) {
     return res.status(401).send('Invalid Token');   
    }
    next();
}

module.exports = auth;