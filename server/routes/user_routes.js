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
    .route('/')
    .post(
        async (req, res) => {
            try {
                let name = req.body.name;
                let username = req.body.username;
                if (!name || !username) throw 'You must provide a name and username';
                name = name.trim();
                username = username.trim();
                if (name.length === 0 || username.length === 0) throw 'You must provide a name and username';
                let password = req.body.password;
                name = helpers.validateName(name);
                username = helpers.validateUsername(username);
                password = helpers.validatePassword(password);

                const user = await userData.createUser(name, username, password);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

router
    .route('/:id')
    .get(
        async (req, res) => {
            try {
                let id = req.params.id;
                id = helpers.checkId(id);
                let exists = await redisClient.exists(id);
                if (exists) {
                    let user = await redisClient.get(id);
                    user = JSON.parse(user);
                    return res.json(user);
                }

                const user = await userData.findUserById(id);
                const flatResult = JSON.stringify(user);
                let set = await redisClient.set(id, flatResult);
                return res.json(user);
            } catch (e) {
                return res.status(500).json({ error: e });
            }
        });

//might not use because auth is firebase
router
    .route('/check')
    .get(
        async (req, res) => {
            try {
                let username = req.query.username;
                let password = req.query.password;
                if (!username || !password) throw 'You must provide a username and password';
                username = username.trim();
                password = password.trim();
                if (username.length === 0 || password.length === 0) throw 'You must provide a username and password';
                username = helpers.validateUsername(username);
                password = helpers.validatePassword(password);

                const user = await userData.checkUser(username, password);
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


export default router;
