import React,{useState,useRef} from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useinterview";
import {useNavigate} from "react-router";

const Home = () => {
  const {generateReport,Loading} = useInterview();
  const [jobDescription, setjobDescription] = useState("");
  const [selfDescription, setselfDescription] = useState("");
  const resumeInputRef=useRef(null);
  const navigate=useNavigate();  
  const handleSubmit=async ()=>{
    try{
      const resumeFile=resumeInputRef.current?.files?.[0];
      const data= await generateReport({
        jobDescription,
        selfDescription,
        resumeFile
      });
      if(data && data._id){
        setjobDescription("");
        setselfDescription("");
        if(resumeInputRef.current){
          resumeInputRef.current.value="";
        }
        navigate(`/interview/${data._id}`);
      }
    }catch(err){
       console.log("Error in handle submit : ", err.message);
    }
  }
  
  if(Loading){
    return(
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",backgroundColor:"#0a0a0a",gap:"20px"}}>
        <div style={{
          width:"60px",height:"60px",
          border:"4px solid rgba(255,255,255,0.1)",
          borderTop:"4px solid #ff1d69",
          borderRadius:"50%",
          animation:"spin 1s linear infinite"
        }}></div>
        <p style={{color:"#fff",fontSize:"1.2rem"}}>Generating your interview report...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }
  
    return (
      <div className="home">
        <div className="interview-input">
          <div className="left">
          
            <label htmlFor="jobDescription">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e)=>setjobDescription(e.target.value)}
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description here...."
          ></textarea>
         
        </div>
        <div className="right">
          <div className="input-group">
            <p>
              Resume
              <small style={{fontSize:'13px',color:'#ff1d69ff'}}>
                (Use Resume and Self description togeather for best result)
              </small>
            </p>
            <label htmlFor="resume" className="file-label">
              Upload resume
            </label>
            <input ref={resumeInputRef}  type="file" hidden name="resume" id="resume" accept=".pdf" />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea 
              value={selfDescription}
              onChange={(e)=>setselfDescription(e.target.value)}
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in a few Sentence..."
            ></textarea>
          </div>
          <button
          onClick={handleSubmit}
          disabled={Loading}
          className="generate-btn">Generate Interview Report</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
