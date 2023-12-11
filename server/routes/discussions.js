import { Router } from 'express';
const router = Router();
import { discussionData, userData } from '../data/index.js';
import * as helpers from "../helpers.js";
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';



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
    // (req, res, next) => {
    //   if (!req.session.user) {
    //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
    //   }
    //   next();
    // },
    async (req, res) => {
      //code here for POST
      const discussionInfo = req.body;  
      try {
        let title = discussionInfo.title;
        let content = discussionInfo.content;
        let userId = discussionInfo.userId;
        let username = discussionInfo.username;
        let tags = discussionInfo.tags;
        let image = discussionInfo.image;
        let url = discussionInfo.url;
        if (!title || !content || !userId || !username) throw 'Not all neccessary fields provided in request body';
        
        title = helpers.checkTitle(title);
        content = helpers.checkContent(content);
        userId = helpers.checkId(userId, "User ID");
        username = helpers.validateUsername(username);
        if (tags) {
          tags = helpers.checkTags(tags);
        } else {
          tags = [];
        }
        if (image) {
          image = "" //will change later
        } else {
          image = ""
        }
        if (url) {
          url = helpers.checkURL(url);
        } else {
          url = ""
        }
        

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