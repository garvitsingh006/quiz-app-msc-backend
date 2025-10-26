import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Question } from "../models/question.model.js";


const fetchAllQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({}, {correctAnswer: 0})
        throw new ApiResponse(200, questions, "Questions fetched successfully")
    } catch (error) {
        throw new ApiError(500, `Error fetchng questions: ${error.message}`)
    }
})

const calculateScore = asyncHandler(async (req, res) => {
    try {
        const {answers} = req.body;
        let score = 0;
        for (const ans of answers) {
            const question = await Question.findById(ans.questionId);
            if (!question) {
                throw new ApiError(404, "Question not found")
            }
            if (ans.selectedOption === question.correctAnswer) {
                score++;
            }
        }
    
        const percentage = (score/(answers.length)) * 100;
        const result = {
            score: score,
            percentage: percentage
        }
    
        res
        .status(200)
        .json(new ApiResponse(200, result))
    } catch (error) {
        throw new ApiError(500, `Error calculating score: ${error.message}`)
    }
})



export {fetchAllQuestions, calculateScore}