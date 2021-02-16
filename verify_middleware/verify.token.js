const jwt = require('jsonwebtoken');
const secretToken = process.env.SECRET_TOKEN;

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization; //gets the token
    if(!token) {
        res.status(403).json({ error: "invalid token" });
    } else {
        //verifies token
        jwt.verify(token.split(" ")[1], secretToken, (error, value) => {
            if(error) res.status(500).json({ error });
            req.user = value.data;
            next();
        });
    }
}