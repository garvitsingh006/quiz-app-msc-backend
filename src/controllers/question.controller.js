import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Question } from "../models/question.model.js";


const fetchAllQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({}, {correctAnswer: 0})
        res.status(200).json(new ApiResponse(200, questions, "Questions fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Questions fetched successfully")
    }
})

const calculateScore = asyncHandler(async (req, res) => {
    try {
        const { answers } = req.body;
        console.log(answers)
        let score = 0;
        const results = [];

        for (const ans of answers) {
            const question = await Question.findById(ans.questionId);
            if (!question) {
                throw new ApiError(404, "Question not found");
            }

            const isCorrect = ans.selectedOption === question.correctAnswer;
            if (isCorrect) score++;

            results.push({
                questionId: ans.questionId,
                questionText: question.text,
                options: question.options,
                selectedOption: ans.selectedOption,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect
            });
        }

        const percentage = (score / answers.length) * 100;

        const result = {
            score,
            totalQuestions: answers.length,
            percentage,
            details: results
        };

        res
            .status(200)
            .json(new ApiResponse(200, result));
    } catch (error) {
        throw new ApiError(501, `Error calculating score: ${error.message}`);
    }
});




export {fetchAllQuestions, calculateScore}