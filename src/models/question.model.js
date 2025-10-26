import mongoose, {Schema} from "mongoose"

const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [String],
    correctAnswer: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Question = mongoose.model("Question", questionSchema)