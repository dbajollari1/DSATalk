import { Router } from 'express';
const router = Router();
import { userData } from '../data/index.js';

router
    .route('/email/:id')
    .get(
        async (req, res) => {
            try {
                //assumnig we have a function to get all discussions and if I remeqmber correctly we are hardcoding the questions
                const user = await userData.findUserByEmail(req.params.id);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });
router        
    .route('/addProblem/:id')
    .put(
        async (req, res) => {
            try {
                //assumnig we have a function to get all discussions and if I remeqmber correctly we are hardcoding the questions
                console.log("Questions = ",req.body.questions)

                const user = await userData.updateUserProbelms(req.params.id,req.body.questions);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

export default router;
