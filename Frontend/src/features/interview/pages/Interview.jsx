import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { FiCode, FiMessageSquare, FiMap, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useInterview }  from "../hooks/useinterview";
import { useParams } from "react-router";

const Interview = () => {
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("Technical");
  const [openAccordion, setOpenAccordion] = useState(0);
  const { report, getReportById, Loading } = useInterview();

  useEffect(() => {
    if (interviewId && (!report || report._id !== interviewId)) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (Loading || !report) {
    return (
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",backgroundColor:"#0a0a0a",gap:"20px"}}>
        <div style={{
          width:"60px",height:"60px",
          border:"4px solid rgba(255,255,255,0.1)",
          borderTop:"4px solid #ff1d69",
          borderRadius:"50%",
          animation:"spin 1s linear infinite"
        }}></div>
        <p style={{color:"#fff",fontSize:"1.2rem"}}>Loading interview details...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="interview-page">
      <div className="interview-card">
        
        {/* Left Sidebar */}
        <div className="sidebar">
          <p className="sidebar-heading">SECTIONS</p>
          <div className="nav-items">
            <button 
              className={`nav-btn ${activeTab === "Technical" ? "active" : ""}`}
              onClick={() => setActiveTab("Technical")}
            >
              <FiCode className="icon" /> Technical Questions
            </button>
            <button 
              className={`nav-btn ${activeTab === "Behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("Behavioral")}
            >
              <FiMessageSquare className="icon" /> Behavioral Questions
            </button>
            <button 
              className={`nav-btn ${activeTab === "Roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("Roadmap")}
            >
              <FiMap className="icon" /> Road Map
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {activeTab === "Technical" && (
            <>
              <div className="content-header">
                <h2>Technical Questions</h2>
                <span className="pill">{report.TechnicalQuestion.length} questions</span>
              </div>
              <div className="questions-list">
                {report.TechnicalQuestion.map((q, index) => (
                  <div key={index} className={`accordion-item ${openAccordion === index ? "open" : ""}`}>
                    <div className="accordion-header" onClick={() => setOpenAccordion(openAccordion === index ? null : index)}>
                      <div className="q-title">
                        <span className="q-num">Q{index + 1}</span>
                        <span className="q-text">{q.question}</span>
                      </div>
                      {openAccordion === index ? <FiChevronUp className="chevron" /> : <FiChevronDown className="chevron" />}
                    </div>
                    {openAccordion === index && (
                      <div className="accordion-body">
                        <div className="section">
                          <p className="sub-heading purple">INTENTION</p>
                          <p className="text">{q.intention}</p>
                        </div>
                        <div className="section mt-2">
                          <p className="sub-heading green">MODEL ANSWER</p>
                          <p className="text">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Behavioral" && (
            <>
              <div className="content-header">
                <h2>Behavioural Questions</h2>
                <span className="pill">{report.BehaviouralQuestion.length} questions</span>
              </div>
              <div className="questions-list">
                {report.BehaviouralQuestion.map((q, index) => (
                  <div key={index} className={`accordion-item ${openAccordion === index ? "open" : ""}`}>
                    <div className="accordion-header" onClick={() => setOpenAccordion(openAccordion === index ? null : index)}>
                      <div className="q-title">
                        <span className="q-num">Q{index + 1}</span>
                        <span className="q-text">{q.question}</span>
                      </div>
                      {openAccordion === index ? <FiChevronUp className="chevron" /> : <FiChevronDown className="chevron" />}
                    </div>
                    {openAccordion === index && (
                      <div className="accordion-body">
                        <div className="section">
                          <p className="sub-heading purple">INTENTION</p>
                          <p className="text">{q.intention}</p>
                        </div>
                        <div className="section mt-2">
                          <p className="sub-heading green">MODEL ANSWER</p>
                          <p className="text">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Roadmap" && (
            <>
              <div className="content-header">
                <h2>Preparation Road Map</h2>
                <span className="pill">{report.PreparationPlan.length}-day plan</span>
              </div>
              <div className="timeline">
                {report.PreparationPlan.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4 className="day-title">
                        <span className="day-text">Day {item.day}</span> {item.focus}
                      </h4>
                      <ul className="task-list">
                        {item.tasks.map((task, tIdx) => (
                          <li key={tIdx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="score-section">
            <p className="sidebar-heading">MATCH SCORE</p>
            <div className="score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${report.matchScore || 0}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{report.matchScore ?? 0}</text>
                <text x="18" y="24" className="percent-sign">%</text>
              </svg>
            </div>
            <p className="score-text">
              {report.matchScore >= 70 ? "Strong match for this role" : report.matchScore >= 40 ? "Moderate match for this role" : "Needs preparation"}
            </p>
          </div>

          <div className="skills-section">
            <p className="sidebar-heading">SKILL GAPS</p>
            <div className="skills-list">
              {report.SkillGaps.map((item, index) => (
                <span key={index} className={`skill-tag ${
                  item.severity === "high" ? "red" :
                  item.severity === "medium" ? "yellow" : "green"
                }`}>
                  {item.skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Interview;