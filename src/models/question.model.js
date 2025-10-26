import mongoose, {Schema} from "mongoose"

const questionSchema = new Schema({
    text: {
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