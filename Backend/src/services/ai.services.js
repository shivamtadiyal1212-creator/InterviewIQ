const { GoogleGenAI, Type } = require("@google/genai");
const {z}=require("zod");
const{zodToJsonSchema}=require('zod-to-json-schema')

const ai = new GoogleGenAI({apiKey:process.env.GEMAI_API_KEY});


const genAiSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { type: Type.NUMBER, description: "The match is score between 0 to 100 indicating how well the candinate profile match the job description" },
        technicalQuestion: {
            type: Type.ARRAY,
            description: "Technical Questions that can be asked in the interview along with the intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description:"The Technical Question can be ask in the interview" },
                    intention: { type: Type.STRING, description:"The intention behind asking this question" },
                    answer: { type: Type.STRING, description:"How to answer this question,what points to cover ,what apporach to take etc" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral Questions that can be asked in the interview along with the intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The Behavioral Question can be ask in the interview" },
                    intention: { type: Type.STRING, description: "The intention behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question,what points to cover ,what apporach to take etc" }
                },
                required: ["question","intention","answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description:"List of skill gap in the candinate profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description:"The skill which the candinate is lacking" },
                    severity: { type: Type.STRING, enum: ["low","medium","high"], description: "The severity of the skill gap" }
                },
                required: ["skill","severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "The preparation plan for the candinate to follow in order to prepare for the interview effectively",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "The day number in the preparation plan, start from day 1" },
                    focus: { type: Type.STRING, description: "The main focus of this in the preparation plan eg. data structures ,system desgin,mock interview" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "List of tasks to be done on this day to follow the preparation plan , eg. read a specfic book,solve problems from a specific platform",
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title:{
            type:Type.STRING,
            description:"The title of the job for which the interview is being generated"
        }
    },
    required: ["matchScore", "technicalQuestion", "behavioralQuestions", "skillGaps", "preparationPlan","title"]
};

async function generateInterviewReport({resume,selfDescription,jobDescription}){
     const prompt=`Generate an interview report for a candinate with the following details:
     Resume:${resume}
     Self Description:${selfDescription}
     Job Description:${jobDescription}
     Please generate `
    const res=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: genAiSchema
        }
    })
    
    return JSON.parse(res.text);
    
}

module.exports={generateInterviewReport};