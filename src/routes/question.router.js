import {Router} from "express"
import {fetchAllQuestions, calculateScore} from "../controllers/question.controller.js"

const router = Router()

router.route("/fetchAll").get(fetchAllQuestions)
router.route("/calculateScore").post(calculateScore)

export default router