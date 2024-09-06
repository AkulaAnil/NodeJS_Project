const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');


// @desc Post Register a User
// @route POST /api/users
// @access public
const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const isUserAvailable = User.findOne({ email: email });
    if(isUserAvailable) {
        // console.log("IFFFFFFFFFFFFFFFFFFFFF 1");
        res.status(400);
        throw new Error("User Already registered, Pls try another one !");
    }
    const hasPassword = await bcrypt.hash(password, 10);
    console.log("hasPassword =>", hasPassword);
    const user = User.create({
        username, 
        email,
        password: hasPassword
    });
    if(user) {
        res.status(201).json({
            message: 'New User Register sucessfully',
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User Data is not valid");
    }
});


// @desc Post Login a User
// @route POST /api/users
// @access public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "20m" }
        )
        res.status(200).json({ 
            accessToken,
            message: 'User login successfully...'
        });
    } else {
        res.status(401);
        throw new Error("Email or Password invalid !");
    }
});


// @desc Get curremt User Informanation
// @route GET /api/users
// @access private
const getUserInfo = asyncHandler( async (req, res) => {
    console.log("hii =>", req.user)
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getUserInfo };