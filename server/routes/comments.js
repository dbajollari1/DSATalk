import { Router } from 'express';
import { createClient } from 'redis';
const router = Router();
import { commentData, replyData, userData } from '../data/index.js';
import * as helpers from "../helpers.js";
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import * as dotenv from 'dotenv';
dotenv.config();

//const client = redis.createClient({url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT});
const client = createClient({socket: {port:process.env.REDIS_PORT, host:process.env.REDIS_HOST}});
client.connect().then(() => { });

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
                const updatedDiscussion = await commentData.remove(req.params.discussionId, req.params.commentId)
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

                const createdReply = await commentData.create(discussionId, commentId, userId, username, content);
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
                const updatedDiscussion = await commentData.remove(req.params.discussionId, req.params.commentId,req.params.replyId)
                return res.status(200).json(updatedDiscussion);
            } catch (e) {
                return res.status(400).json({ error: e });
            }
        })
export default router;

