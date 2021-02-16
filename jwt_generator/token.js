const jwt = require('jsonwebtoken');
const secretToken = process.env.SECRET_TOKEN;

exports.generateToken = (user) => jwt.sign({ data: user }, 
    secretToken, { expiresIn: "24h"},    
);