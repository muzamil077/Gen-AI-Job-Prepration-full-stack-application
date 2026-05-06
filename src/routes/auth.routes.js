const express = require('express');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();    

/**
 * @route POST /api/auth/register
 * @description Register a new user,expects username, email and password in the request body
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */ 

authRouter.post('/login',authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description clear token from cookie and add the token in blacklist
 * @access public
 */
authRouter.get('/logout', authController.logoutUserController)  


module.exports = authRouter;