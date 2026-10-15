import {getAllInterviewReport,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {useContext} from "react";
import {interviewContext} from "../interview.context"

export const useInterview = ()=>{
  const context=useContext(interviewContext);
  if(!context){
    throw new Error("use Interview must be used within an InterviewProvider");
  }
  const{Loading,setLoading,report,setReport,reports,setReports}=context;
  const generateReport=async({jobDescription, selfDescription, resumeFile})=>{
        try{
          setLoading(true);
          const res=await generateInterviewReport({jobDescription,selfDescription,resume: resumeFile});
          setReport(res.interviewReport);
          return res.interviewReport;
        }catch(err){
          console.log("Error in generate report", err);
        }finally{
          setLoading(false);
        }
  }

  const getReportById=async(interviewId)=>{
    setLoading(true)
    try{
      const res=await getInterviewReportById(interviewId);
      setReport(res.interviewReport);
    }catch(err){
      console.log("Error in get report by id",err)
    }finally{
      setLoading(false)
    }
  }
  const getReports=async()=>{
    setLoading(true)
    try{
      const res=await getAllInterviewReport();
      setReports(res.interviews);
    }catch(err){
      console.log("error in get all reports",err)
    }finally{
      setLoading(false)
    }
  }
  
  return {
    generateReport,
    getReportById,
    getReports,
    Loading,
    report,
    reports
  }
}