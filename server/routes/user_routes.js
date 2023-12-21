import { Router } from 'express';
import { userData } from '../data/index.js';
import * as helpers from "../helpers.js";
const router = Router();
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
console.log(process.env.REDIS_HOST)

const redisClient = createClient({url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT});
redisClient.connect().then(() => {});




router
    .route('/:id')
    .get(
        async (req, res) => {
            try {
                let id = req.params.id;
                id = helpers.checkId(id);
                let exists = await client.exists(id);
                if (exists) {
                    let user = await client.get(id);
                    user = JSON.parse(user);
                    return res.json(user);
                }

                const user = await userData.findUserById(id);
                const flatResult = JSON.stringify(user);
                let set = await client.set(id, flatResult);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });


        
//right now when creating a user we don't include an email?
router
    .route('/email/:id')
    .get(
        async (req, res) => {
            try {
                let email = req.params.id;
                //email = helpers.validateEmail(email);
                const user = await userData.findUserByEmail(email);
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
                let id = req.params.id;
                id = helpers.checkId(id);
                let problemId = req.body.questions;
                helpers.isNumberArray(problemId);
                const user = await userData.updateUserProbelms(id, problemId);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

router        
.route('/addUser')
.post(
    async (req, res) => {
        try {
            const user = await userData.createUserSignOn(req.body.email,req.body.username);
            return res.json(user);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    });
        
router        
.route('/signOnSyncUser')
.post(
    async (req, res) => {
        try {
            const user = await userData.createUserSignOnSyncUser(req.body.email,req.body.username);
            return res.json(user);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    });

router
.route('/')
.get(
    async (req, res) => {
        try {
            const users = await userData.getAllUsers();
            return res.json(users);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    });


export default router;
