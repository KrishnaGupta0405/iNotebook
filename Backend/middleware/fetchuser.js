const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "helloWorldThisIsSecretJWTSecret";

const fetchuser = async (req, res, next) =>{
    // get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({error: "please authenticate using the valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "please authenticate using the valid token"});
    }
}

module.exports = fetchuser;
