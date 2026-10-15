const express=require('express');
const authRouter=express.Router();
const authController=require('../controllers/auth.controller');
const {authUser}=require('../middleware/auth.middleware');

/**
 *  @route POST /api/auth/registor
 * @description Registor a new user
 * @access Public
 */


authRouter.post('/registor',authController.registorUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post('/login',authController.loginUser);

/** 
 *@route GET  /api/auth/logout
 *@description Logout a user
 * @access Public
*/

authRouter.get('/logout',authController.logout);

/**
 *  @route GET  /api/auth/getMe
 * @description get the current logged in user details
 * @access private 
 */

authRouter.get('/get-me',authUser,authController.getMe);

module.exports=authRouter;