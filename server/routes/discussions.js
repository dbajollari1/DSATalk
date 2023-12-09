import { Router } from 'express';
const router = Router();
import { discussionData, userData } from '../data/index.js';
import * as helpers from "../helpers.js";



/* will change currently same code as lab 1, will use as a shell */
router
  .route('/')
  .get(
    async (req, res) => {
      try {
        // if (!req.session.user) {
        //   return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        // }
        const discussions = await discussionData.getAll();
        return res.json(discussions);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    })
  .post(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
      }
      next();
    },
    async (req, res) => {
      //code here for POST
      const discussionInfo = req.body;  
      try {
        discussionInfo.title = helpers.validateTitle(discussionInfo.title);
        discussionInfo.content = helpers.validateContent(discussionInfo.content);
        discussionInfo.userId = helpers.checkId(discussionInfo.userId, "User Id");
        discussionInfo.username = helpers.validateUsername(discussionInfo.username);
        //need to make check image function when s3 bucket is done
        if(discussionInfo.image) {
          
          discussionInfo.image = "";
        }
        else{
          discussionInfo.image = "";
        }
        if(discussionInfo.url) {
          discussionInfo.url = helpers.checkURL(discussionInfo.url);
        }
        else{
          discussionInfo.url = "";
        }
        if(discussionInfo.tags) {
          discussionInfo.tags = helpers.checkTags(discussionInfo.tags);
        }
        else{
          discussionInfo.tags = [];
        }
        const userCollection = await users();
        const userCheck1 = await userCollection.findOne({ username: username });
        if (!userCheck1) throw "Error: Cannot find user with that username!";
        const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userCheck2) throw "Error: Cannot find user with that id!";

       


        const createdDiscussion = await discussionData.create(discussionInfo.title, discussionInfo.userId, discussionInfo.username, discussionInfo.content,  discussionInfo.tags, discussionInfo.image, discussionInfo.url);
        return res.status(200).json(createdDiscussion);
      } catch (e) {
        return res.status(400).json({ error: e });
      }

    })
    .patch
    (
      (req, res, next) => {
        if (!req.session.user) {
          return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        }
        next();
      },
      async (req, res) => {
        //code here for PATCH
        const discussionInfo = req.body;
        try {
          if (!discussionInfo || Object.keys(discussionInfo).length === 0) throw 'There are no fields in the request body';
          if (!discussionInfo.title || !discussionInfo.content || !discussionInfo.image) throw 'Not all neccessary fields provided in request body';
  
          discussionInfo.title = helpers.validateTitle(discussionInfo.title);
          discussionInfo.content = helpers.validateContent(discussionInfo.content);
          //im guessing this will be used to update the likes and array of replies
  
          const createdDiscussion = await discussionData.updateDiscussion(discussionInfo.title, discussionInfo.content, req.session.user._id);
          return res.status(200).json(createdDiscussion);
        } catch (e) {
          return res.status(400).json({ error: e });
        }
  
      })


export default router;  