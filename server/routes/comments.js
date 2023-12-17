import { Router } from 'express';
const router = Router();
import { commentData, replyData, discussionData, userData } from '../data/index.js';
import * as helpers from "../helpers.js";
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
console.log(process.env.REDIS_HOST)

const redisClient = createClient({ url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT });
redisClient.connect().then(() => { });

const updateAllDiscussionsRedis = async () => {
    const discussions = await discussionData.getAllDiscussions();
    let searchKey = "all discussions : ";
    const flatResult = JSON.stringify(discussions);
    let setFlatResult = await redisClient.set(searchKey, flatResult);
    let exipiry = await redisClient.expire(searchKey, 3600);
  }

router
    .route('/:id') //posting to the discussion id we are commenting on
    .post(
        // async (req, res, next) => {
        //   if (!req.session.user) {
        //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        //   }
        //   next();
        // },
        async (req, res) => {
            try {
                req.params.id = helpers.checkId(req.params.id, 'ID URL Param');
            } catch (e) {
                return res.status(400).json({ error: e });
            }

            try { 
                const checkD = await discussionData.get(req.params.discussionId); 
            } catch (e){ 
                return res.status(404).json({ error: e });
            }

            const commentInfo = req.body;
            try {
                let discussionId = req.params.id;
                let content = commentInfo.content;
                let userId = commentInfo.userId;
                let username = commentInfo.username;
                if (!content || !userId || !username) throw 'Not all neccessary fields provided in request body';

                content = helpers.checkContent(content);
                userId = helpers.checkId(userId, "User ID");
                username = helpers.validateUsername(username);


                const createdComment = await commentData.create(discussionId, userId, username, content);


                const updatedDiscussion = await discussionData.get(discussionId);
                //update the dicussion in redis
                let searchKey = "discussion: " + discussionId;
                const flatResult = JSON.stringify(updatedDiscussion);
                let setFlatResult = await redisClient.set(searchKey, flatResult);
                
                await updateAllDiscussionsRedis;

                return res.status(200).json(createdComment);
            } catch (e) {
                return res.status(400).json({ error: e });
            }
        })

router
    .route('/:discussionId/:commentId')
    .delete(
        // async (req, res, next) => {
        //   if (!req.session.user) {
        //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        //   }
        //   next();
        // },
        async (req, res) => {
            try {
                req.params.discussionId = helpers.checkId(req.params.discussionId, 'Discussion ID URL Param');
                req.params.commentId = helpers.checkId(req.params.commentId, 'Comment ID URL Param');
            } catch (e) {
                return res.status(400).json({ error: e });
            }

            try { 
                const checkD = await discussionData.get(req.params.discussionId); 
                const checkC = await commentData.get(req.params.commentId); 
            } catch (e){ 
                return res.status(404).json({ error: e });
            }

            try {
                const updatedDiscussion = await commentData.remove(req.params.discussionId, req.params.commentId); 

                const updatedDiscussionR = await discussionData.get(discussionId);
                //update the dicussion in redis
                let searchKey = "discussion: " + discussionId;
                const flatResult = JSON.stringify(updatedDiscussionR);
                let setFlatResult = await redisClient.set(searchKey, flatResult);
                await updateAllDiscussionsRedis;
                return res.status(200).json(updatedDiscussion);
            } catch (e) {
                return res.status(400).json({ error: e });
            }
        })

router
    .route('/:discussionId/:commentId/reply')
    .post(
        // async (req, res, next) => {
        //   if (!req.session.user) {
        //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        //   }
        //   next();
        // },
        async (req, res) => {
            try {
                req.params.discussionId = helpers.checkId(req.params.discussionId, 'Discussion ID URL Param');
                req.params.commentId = helpers.checkId(req.params.commentId, 'Comment ID URL Param');
            } catch (e) {
                return res.status(400).json({ error: e });
            }
            try { 
                const checkD = await discussionData.get(req.params.discussionId); 
                const checkC = await commentData.get(req.params.commentId); 
            } catch (e){ 
                return res.status(404).json({ error: e });
            }

            const replyInfo = req.body;
            try {
                let discussionId = req.params.discussionId;
                let commentId = req.params.commentId;
                let content = replyInfo.content;
                let userId = replyInfo.userId;
                let username = replyInfo.username;
                if (!content || !userId || !username) throw 'Not all neccessary fields provided in request body';

                content = helpers.checkContent(content);
                userId = helpers.checkId(userId, "User ID");
                username = helpers.validateUsername(username);

                const createdReply = await replyData.create(discussionId, commentId, userId, username, content);
                const updatedDiscussionR = await discussionData.get(discussionId);
                //update the dicussion in redis
                let searchKey = "discussion: " + discussionId;
                const flatResult = JSON.stringify(updatedDiscussionR);
                let setFlatResult = await redisClient.set(searchKey, flatResult);

                await updateAllDiscussionsRedis;

                return res.status(200).json(createdReply);
            } catch (e) {
                return res.status(400).json({ error: e });
            }
        })
router
    .route('/:discussionId/:commentId/reply/delete/:replyId')
    .delete(
        // async (req, res, next) => {
        //   if (!req.session.user) {
        //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        //   }
        //   next();
        // },
        async (req, res) => {
            try {
                req.params.discussionId = helpers.checkId(req.params.discussionId, 'Discussion ID URL Param');
                req.params.commentId = helpers.checkId(req.params.commentId, 'Comment ID URL Param');
                req.params.replyId = helpers.checkId(req.params.replyId, 'Reply ID URL Param');
            } catch (e) {
                return res.status(400).json({ error: e });
            }

            try { 
                const checkD = await discussionData.get(req.params.discussionId); 
                const checkC = await commentData.get(req.params.commentId); 
                const checkR = await replyData.get(req.params.replyId);
            } catch (e){ 
                return res.status(404).json({ error: e });
            }

            try {
                const updatedDiscussion = await replyData.remove(req.params.discussionId, req.params.commentId, req.params.replyId)
                const updatedDiscussionR = await discussionData.get(discussionId);
                //update the dicussion in redis
                let searchKey = "discussion: " + discussionId;
                const flatResult = JSON.stringify(updatedDiscussionR);
                let setFlatResult = await redisClient.set(searchKey, flatResult);

                await updateAllDiscussionsRedis;
                
                return res.status(200).json(updatedDiscussion);
            } catch (e) {
                return res.status(400).json({ error: e });
            }
        })
export default router;

