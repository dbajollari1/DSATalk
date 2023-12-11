import { Router } from 'express';
const router = Router();



router
    .route('/')
    .post(
        async (req, res) => {
            try {
                

                
                const problems = await problemData.getAll();
                return res.json(problems);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

export default router;
