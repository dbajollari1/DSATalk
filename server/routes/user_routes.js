import { Router } from 'express';
const router = Router();
import { userData } from '../data/index.js';


router
    .route('/')
    .post(
        async (req, res) => {
            try {
                let name = req.body.name;
                let username = req.body.username;
                console.log("name = ",name)
                if (!name || !username) throw 'You must provide a name and username';
                name = name.trim();
                username = username.trim();
                if (name.length === 0 || username.length === 0) throw 'You must provide a name and username';
                let password = req.body.password;

                const user = await userData.createUser(name, username, password);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

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
