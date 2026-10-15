const pdfParse = require("pdf-parse");
const {generateInterviewReport}=require('../services/ai.services');
const interviewReportModel=require("../models/interviewReport.model");

async function generateInterviewController(req, res) {
    try {
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();
        const {selfDescription,jobDescription}=req.body;
        const interviewReportByAi=await generateInterviewReport({
            resume:resumeContent.text,
            selfDescription:selfDescription,
            jobDescription:jobDescription
        })
        const interviewReport=await interviewReportModel.create({
            user:req.user.id,
            title:interviewReportByAi.title,
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
            TechnicalQuestion: interviewReportByAi.technicalQuestion,
            BehaviouralQuestion: interviewReportByAi.behavioralQuestions,
            SkillGaps: interviewReportByAi.skillGaps,
            PreparationPlan: interviewReportByAi.preparationPlan,
            matchScore: interviewReportByAi.matchScore
        }) 

        res.status(201).json({
            message:"interview Report generated successfully",
            interviewReport
        })
    } catch(err) {
        console.log("Error in generateInterviewController:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function getInterviewReportController(req,res){
    try{
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });
        if(!interviewReport){
            return res.status(404).json({
                message:"No interview found"
            });
        }        
        return res.status(200).json({
            message:"interview Report fetch succesfully",
            interviewReport
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}


async function getAllInterviewReportController(req,res){
    try{
        const interviews=await interviewReportModel.find({user:req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -v -technicalQuestion -behaviouralQuestion -skillGaps -preparationPlan -createdAt");
        
        return res.status(200).json({
            message:"all interviews fetched successfully",
            interviews
        })

    }catch(err){
        console.log(err)
    }
}

module.exports = { generateInterviewController,getInterviewReportController,getAllInterviewReportController };