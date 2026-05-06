const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.mode');


/**
 * @name registerUserController
 * @description Register a new user,expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'please provide username, email and password', success: false });
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'account already exists with this username or email', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token);
    res.status(201).json({ message: 'User registered successfully', user });
}

/**
 * @name loginUserController
 * @description Login a user,expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'please provide email and password', success: false });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'invalid email or password', success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'invalid email or password', success: false });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token);
    res.status(200).json({ message: 'User logged in successfully', user: user.username, id: user._id, email: user.email });
}

/**
 * @route POST /api/auth/logout
 * @description clear token from cookie and add the token in blacklist
 * @access public
 */


    async function logoutUserController(req, res) {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token })

        }

        res.clearCookie("token")

        res.status(200).json({

            message: "user logout successfully"
        })
    }   


module.exports = { registerUserController, loginUserController, logoutUserController };    