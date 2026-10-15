const express=require('express');
const {authUser}=require('../middleware/auth.middleware');
const {generateInterviewController,getInterviewReportController,getAllInterviewReportController}=require('../controllers/interview.controller');
const interviewRouter=express.Router();
const upload=require("../middleware/file.middleware");

/**
 * @route POST /api/interview
 * @desc Generate new Interview Report on the basics ofof user selfdescription resume pdf and job description
 * @access Private
 * @body {resume,selfDescription,jobDescription}
 * @middleware authUser
 */
interviewRouter.post('/',authUser,upload.single('resume'),generateInterviewController);


/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 * @middleware authUser
 */
interviewRouter.get('/report/:interviewId',authUser,getInterviewReportController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access private
 * @middleware authUser
 */
interviewRouter.get('/',authUser,getAllInterviewReportController)


module.exports=interviewRouter;