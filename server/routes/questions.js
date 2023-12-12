import { Router } from 'express';
import { questionData } from '../data/index.js';
import * as helpers from "../helpers.js";
const router = Router();



router
    .route('/')
    .post(
        async (req, res) => {
            try {
                let problemInfo = req.body;
                let title = problemInfo.title;
                let link = problemInfo.link;
                let difficulty = problemInfo.difficulty;
                let topics = problemInfo.topics;
                let companies = problemInfo.companies;
                if (!title || !link || !difficulty || !topics || !companies) throw 'Not all neccessary fields provided in request body';
                
                title = helpers.checkTitle(title);
                link = helpers.checkURL(link);
                const addedProblem = await questionData.createQuestion(title, link, difficulty, topics, companies);
                return res.json(addedProblem);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        })
    .get(
        async (req, res) => {
            try {
                const problems = await questionData.getAllQuestions();
                return res.json(problems);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

export default router;
