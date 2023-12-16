import { Router } from 'express';
const router = Router();
import { discussionData, userData } from '../data/index.js';
import * as helpers from "../helpers.js";
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
console.log(process.env.REDIS_HOST)

const redisClient = createClient({url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT});
redisClient.connect().then(() => {});


router
  .route('/:pagenum')
  .get(
    async (req, res, next) => {
      try {
        req.params.pagenum = helpers.checkPageNum(req.params.pagenum);
      } catch (e) {
        return res.status(400).json({ error: e });
      }
      const pagenum = req.params.pagenum;
      let searchKey = "discussion page: " + pagenum;
      let exists = await client.exists(searchKey);
      if (exists) {
        console.log('Results  in cache');
        const searchResults = await client.get(searchKey);
        //const searchResultsJSON = unflatten(searchResults);
        const searchResultsJSON = JSON.parse(searchResults)
        return res.status(200).json(searchResultsJSON)
      } else {
        next();
      }
    },
    async (req, res) => {
      try {
        // if (!req.session.user) {
        //   return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        // }
        try {
          req.params.pagenum = helpers.checkPageNum(req.params.pagenum);
        } catch (e) {
          return res.status(400).json({ error: e });
        }
        const pagenum = req.params.pagenum;
        const discussions = await discussionData.getAll(req.params.pagenum);
        if (discussions.length === 0) {
          return res.status(404).json({ error: "Error: Page number out of range. No more discussions!" });
        }
        let searchKey = "discussion page: " + pagenum;
        const flatResult = JSON.stringify(discussions);
        let setFlatResult = await client.set(searchKey, flatResult);
        return res.json(discussions);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    })

router
  .route('/discussion/:id')
  .get(
    async (req, res, next) => {
      try {
        req.params.id = helpers.checkId(req.params.id, "Discussion ID");
      } catch (e) {
        return res.status(400).json({ error: e });
      }
      const discussionId = req.params.id;
      let searchKey = "discussion: " + discussionId;
      let exists = await redisClient.exists(searchKey);
      if (exists) {
        console.log('Results  in cache');
        const searchResults = await redisClient.get(searchKey);
        //const searchResultsJSON = unflatten(searchResults);
        const searchResultsJSON = JSON.parse(searchResults)
        return res.status(200).json(searchResultsJSON)
      } else {
        next();
      }
    },
    async (req, res) => {
      try {
        // if (!req.session.user) {
        //   return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
        // }
        try {
          req.params.id = helpers.checkId(req.params.id, "Discussion ID");
        } catch (e) {
          return res.status(400).json({ error: e });
        }
        const discussionId = req.params.id;
        try {
          const discussion = await discussionData.get(discussionId);
          let searchKey = "discussion: " + discussionId;
          const flatResult = JSON.stringify(discussion);
          let setFlatResult = await client.set(searchKey, flatResult);
          return res.status(200).json(discussion);
        } catch (e) {
          res.status(404).json({ error: e });
        }
      } catch (e) {
        return res.status(500).json({ error: e });
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
      try {
        req.params.id = helpers.checkId(req.params.id, "Discussion ID");
      } catch (e) {
        return res.status(400).json({ error: e });
      }
      const discussionId = req.params.id;
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
router
  .route('/')
  .post(
    // async (req, res, next) => {
    //   if (!req.session.user) {
    //     return res.status(401.).json({ error: "You must be logged in to look at the discussions" });
    //   }
    //   next();
    // },
    async (req, res) => {
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

        //title = helpers.checkTitle(title);
        //content = helpers.checkContent(content);
        //userId = helpers.checkId(userId, "User ID");
        //username = helpers.validateUsername(username);
        //if (tags) {
          //tags = helpers.checkTags(tags);
        //} else {
          tags = [];
        //}
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

        const createdDiscussion = await discussionData.create(discussionInfo.title, discussionInfo.userId, discussionInfo.username, discussionInfo.content, discussionInfo.tags, discussionInfo.image, discussionInfo.url);
        return res.status(200).json(createdDiscussion);
      } catch (e) {
        return res.status(400).json({ error: e });
      }
    })
    .get(
      async (req, res) => {
          try {
                  let discussions = await discussionData.getAllDiscussions();
                  return res.json(discussions);
              }
              
          catch (e) {
              return res.status(500).json({ error: e });
          }
      });

//will need to change so can work with users firebase credentials
router
  .route('/:id/likes')
  .post(
    // (req, res, next) => {
    //   if (!req.session.user) {
    //     return res.status(401).json({ error: "You must be logged in to like a discussion!" });
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
        let discussionFound = await discussionData.get(req.params.id);
      } catch (e) {
        return res.status(404).json({ error: e });
      }

      try {
        const newDiscussion = await discussionData.addLike(req.params.id, req.session.user.id, req.session.user.username);
        return res.status(200).json(newRecipe);
      } catch (e) {
        if (e === "Error: No discussion found with that ID") {
          return res.status(404).json({ error: e });
        } else {
          return res.status(500).json({ error: e });
        }
      }
    });


export default router;  