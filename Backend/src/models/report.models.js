import {mongoose} from "mongoose"

/**
 * Job Description Schema
 * Resume Text
 * Self Description
 * score as number
 * Technical Questions as objects in array :- [{},{},{}]
 * Behavioral Questions as objects in array :- [{},{},{}]
 * Skill gaps in array as enum which contains severity as low, medium and high
 * Preparation plans as objects in array :- [{}, {}]
 * 
 */

const techinicalQuesSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "Techinal question is required"]
    },
    intention:{
        type: String,
        required: [true, 'Intention is required']
    },
    answer:{
        type: String,
        requried: [true, "Answer is required"]
    },
    
}, {_id: false})

const behaviouralQuestSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "Techinal question is required"]
    },
    intention:{
        type: String,
        required: [true, 'Intention is required']
    },
    answer:{
        type: String,
        requried: [true, "Answer is required"]
    },
    
})

const skillGapsSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true, 'Skills are required']
    },
    severity:{
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'severity is required']
    }
    
}, {_id: false})

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "Day is required"]
        },
        focus:{
            type: String,
            required: [true, "Focus is required"]
        },
        tasks:[
            {
                type: String,
                required:[true, 'Task is required']
            }
        ]
    }
)

const reportSchema = new mongoose.Schema(
    {
        jobDesc: {
            type: String,
            required: [true, "Job Description is required"]
        },
        resume:{
            type: String,
        },
        score:{
            type: Number,
            min: 0,
            max: 100
        },
        techinicalQues: [techinicalQuesSchema],
        behaviouralQues: [behaviouralQuestSchema],
        skillGaps: [skillGapsSchema],
        preparationPlan: [preparationPlanSchema]
    },{
        timestamps: true
    }
)

const reportModel = mongoose.model("report", reportSchema)

export default reportModel