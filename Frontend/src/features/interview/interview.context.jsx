import {createContext, useState} from "react";

export const interviewContext=createContext();

export const InterviewProvider=({children})=>{
    const [Loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports,setReports]=useState([]);
    return (
        <interviewContext.Provider value={{
            Loading,
            setLoading,
            report,
            setReport,
            reports,
            setReports

        }}>
            {children}
        </interviewContext.Provider>
    )
}

export default InterviewProvider;