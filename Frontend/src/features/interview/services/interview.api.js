import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

/**
 * @description Service to generte interview report based on user self description , resume and job description
 */

export const generateInterviewReport=async ({jobDescription,selfDescription,resume})=>{
   const formData=new FormData();
   formData.append("jobDescription",jobDescription);
   formData.append("selfDescription",selfDescription);
   formData.append("resume",resume);
   const response=await api.post("/api/interview",formData);
   return response.data;
}


/**
 * @description Service to fetch interview report based on interview id 
 */
export const getInterviewReportById=async(interviewId)=>{
    const response=await api.get(`/api/interview/${interviewId}`);
    return response.data;
}

/**
 * @description Service to fetch all interview reports of user
 */

export const getAllInterviewReport=async()=>{
    const response=await api.get(`/api/interview`);
    return response.data;
}