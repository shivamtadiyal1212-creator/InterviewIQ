const mongoose = require("mongoose");

/**
 * job description
 * resume text:String
 * Self destruction:String
 * 
 * matchScore:Number
 * 
 * Techincal question:
 *       [{
 *             question:"",
 *             intenstion:""
 *             answer:""
 *        }]
 * Behavioral Question:
 *          [{
 *             question:"",
 *             intenstion:""
 *             answer:""
 *          }]
 * Skill gaps:
 *      [
 *          skill:""
 *          severity:{ type:string, enum:["low","medium","high"] }
 *      ]
 * Prepartion Plan:
 *          [{
 *              day:number
 *              focus:String
 *              tasks:[String]     
 *          }]
 */

const TechnicalQuestionSchema=new mongoose.Schema({
    question:{ 
        type:String,
        required:[true,"Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intenstion is Required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const BehaviouralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Behavioural Question is Required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }

},
{
    _id:false
})

const skillGapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        lowercase: true,
        required:[true,"Severity is required"]
    }
},
{
    _id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:{
        type:[String],
        required:[true,"Task is required"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:[true,"Title is required"]
    },
    jobDescription:{
       type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
       type:Number,
       min:0,
       max:100
    },
    TechnicalQuestion:[
        TechnicalQuestionSchema
    ],
    BehaviouralQuestion:[
        BehaviouralQuestionSchema
    ],
    SkillGaps:[
        skillGapsSchema
    ],
    PreparationPlan:[
        preparationPlanSchema
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

});

const InterviewReportModel = mongoose.model(
  "interviewReport",
  interviewReportSchema,
);

module.exports = InterviewReportModel;
