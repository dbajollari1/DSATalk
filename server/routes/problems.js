import { Router } from 'express';
const router = Router();
import { problemData } from '../data/index.js';
import * as helpers from "../helpers.js";


router
    .route('/')
    .get(
        async (req, res) => {
            try {
                //assumnig we have a function to get all discussions and if I remeqmber correctly we are hardcoding the questions
                const problems = await problemData.getAll();
                return res.json(problems);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

export default router;
