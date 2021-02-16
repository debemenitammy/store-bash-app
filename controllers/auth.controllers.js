const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt_generator = require('../jwt_generator/token');

exports.signup = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(); //generates salt
        //Get user info
        const { fullname, email, mobile_number, address, gender, password} = req.body;
        //if user's info exists, hash password
        if(fullname && email && password) {
            bcrypt.hash(password, salt, async(error, hashedPassword) => {
                if(error) {
                    console.log(error);
                    res.status(500).json(error);
                } else {
                    //create user account
                    const newUser = new User({
                        fullname,
                        email,
                        mobile_number,
                        address, 
                        gender,
                        password: hashedPassword
                    });
                    //save user
                    const myUser = await newUser.save();
                    res.status(201).json({
                        success: true,
                        fullname,
                        email,
                        mobile_number,
                        address,
                        gender,
                        token: jwt_generator.generateToken(myUser)
                    });
                }
            });
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body; //get user email and password
        const myUser = await User.findOne({ email: email }); //find user with that email
        if(!myUser) {
            res.status(404).json({ error: "no user with that email" });
        } else {
            bcrypt.compare(password, myUser.password, (error, match) => {
                if(error) {
                    res.status(500).json(error);
                } else if(match) {
                    myUser.password = null;
                    const responseData = {
                        dateGenerated: myUser.dateGenerated,
                        _id: myUser._id,
                        fullname: myUser.fullname,
                        email: myUser.email,
                        mobile_number: myUser.mobile_number,
                        address: myUser.address,
                        gender: myUser.gender,
                        token: jwt_generator.generateToken(myUser)
                    };
                    res.status(201).json(responseData);
                } else {
                    res.status(403).json({ error: "password do not match" });
                }
            });
        }
    } catch(error) {
        res.status(500).json(error);
    }
};