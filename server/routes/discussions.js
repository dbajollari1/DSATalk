import { Router } from 'express';
const router = Router();
import { discussionData } from '../data/index.js';
import * as helpers from "../helpers.js";


/* will change currently same code as lab 1, will use as a shell */
router
  .route('/')
  .get(
    async (req, res) => {
      const qP = req.query;
      let pageNum = 1
      try {
        if (qP.page) {
          pageNum = helpers.checkPageNum(Number(qP.page))
        }
        const recipes = await recipeData.getAll(pageNum);
        if (recipes.length === 0) {
          return res.status(404).json({ error: "There are no more recipes!" });
        }
        return res.status(200).json(recipes);
      } catch (e) {
        console.log(e)
        return res.status(400).json({ error: e });
      }
      //code here for GET
    })
  .post(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401.).json({ error: "You must be logged in to create a recipe!" });
      }
      next();
    },
    async (req, res) => {
      //code here for POST
      let recipeInfo = req.body;
      if (!recipeInfo || Object.keys(recipeInfo).length === 0) {
        return res
          .status(400)
          .json({ error: 'There are no fields in the request body' });
      }
      if (!recipeInfo.title || !recipeInfo.ingredients || !recipeInfo.steps || !recipeInfo.skillLevel) {
        return res
          .status(400)
          .json({ error: 'Not all neccessary fields provided in request body' });
      }

      try {
        recipeInfo.title = helpers.checkTitle(recipeInfo.title, 'title');
        recipeInfo.ingredients = helpers.checkIngredientsArr(recipeInfo.ingredients, 'ingredients');
        recipeInfo.steps = helpers.checkStepsArr(recipeInfo.steps, 'steps');
        recipeInfo.skillLevel = helpers.checkSkillLevel(recipeInfo.skillLevel, "skill level");
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        const { title, ingredients, steps, skillLevel } = recipeInfo;
        const newRecipe = await recipeData.create(title, ingredients, skillLevel, steps, req.session.user.id, req.session.user.username);
        return res.json(newRecipe);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = helpers.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const recipe = await recipeData.get(req.params.id);
      return res.status(200).json(recipe);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .patch(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: "You must be logged in to update a recipe!" });
      }
      next();
    },
    async (req, res) => {
      //code here for PATCH
      try {
        req.params.id = helpers.checkId(req.params.id, 'ID URL Param');
      } catch (e) {
        return res.status(400).json({ error: e });
      }

   

      let recipeInfo = req.body;
      if (!recipeInfo || Object.keys(recipeInfo).length === 0) {
        return res
          .status(400)
          .json({ error: 'There are no fields in the request body' });
      }
      if (!recipeInfo.title && !recipeInfo.ingredients && !recipeInfo.steps && !recipeInfo.skillLevel) {
        return res
          .status(400)
          .json({ error: 'Must pass at least one field that can be updated!' });
      }

      try {
        if(recipeInfo.title) { 
          recipeInfo.title = helpers.checkTitle(recipeInfo.title, 'title');
        } else { 
          recipeInfo.title = null;
        }
        if (recipeInfo.ingredients) {
          recipeInfo.ingredients = helpers.checkIngredientsArr(recipeInfo.ingredients, 'ingredients');
        } else { 
          recipeInfo.ingredients = null; 
        }
        if (recipeInfo.steps) { 
          recipeInfo.steps = helpers.checkStepsArr(recipeInfo.steps, 'steps');
        } else { 
          recipeInfo.steps = null; 
        }
        if (recipeInfo.skillLevel) { 
          recipeInfo.skillLevel = helpers.checkSkillLevel(recipeInfo.skillLevel, 'skill level');
        } else { 
          recipeInfo.skillLevel = null; 
        }

      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        const { title, ingredients, steps, skillLevel } = recipeInfo;
        const updatedRecipe = await recipeData.update(req.params.id, title, ingredients, skillLevel, steps, req.session.user.id, req.session.user.username);
        return res.status(200).json(updatedRecipe);
      } catch (e) {
        if(e === "Error: Cannot update other users recipe!") { 
          return res.status(403).json({ error: e });
        } else if (e === "Error: No recipe found with that ID") { 
          return res.status(404).json({ error: e });
        } else { 
          return res.status(500).json({ error: e });
        }
      }

    });



router
  .route('/:id/reviews')
  .post(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: "You must be logged in to create a review!" });
      }
      next();
    },
    async (req, res) => {
      //code here for POST
      try {
        req.params.id = helpers.checkId(req.params.id, 'ID URL Param');
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      let reviewInfo = req.body;
      if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
        return res
          .status(400)
          .json({ error: 'There are no fields in the request body' });
      }
      if (!reviewInfo.rating || !reviewInfo.review) {
        return res
          .status(400)
          .json({ error: 'Not all neccessary fields provided in request body' });
      }

      try {
        reviewInfo.rating = helpers.checkRating(reviewInfo.rating);
        reviewInfo.review = helpers.checkReview(reviewInfo.review);
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        const newReview = await reviewData.create(req.params.id, req.session.user.id, req.session.user.username, reviewInfo.rating, reviewInfo.review);
        return res.status(200).json(newReview);
      } catch (e) {
        if(e === "Error: User has already has reviwed this recipe!") { 
          return res.status(403).json({ error: e });
        } else if(e === "Error: No recipe found with that ID") { 
          return res.status(404).json({ error: e });
        } else { 
          return res.status(500).json({ error: e });
        }
        
      }
    });



router
  .route('/:recipeId/:reviewId')
  .delete(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: "You must be logged in to delete a review!" });
      }
      next();
    },
    async (req, res) => {

      try {
        req.params.recipeId = helpers.checkId(req.params.recipeId, 'ID URL Param');
        req.params.reviewId = helpers.checkId(req.params.reviewId, 'ID URL Param');
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        const removedReview = await reviewData.remove(req.params.recipeId, req.params.reviewId, req.session.user.id, req.session.user.username);
        return res.status(200).json(removedReview);
      } catch (e) {
        if (e === "Error: Cannot delete other users comments") {
          return res.status(403).json({ error: e });
        } else if (e === "Error: No review found with that ID!" || e == "Error: No recipe found with that ID!") {
          return res.status(404).json({ error: e });
        }
        else {
          return res.status(500).json({ error: e });
        }
      }
    });



router
  .route('/:id/likes')
  .post(
    (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: "You must be logged in to like a recipe!" });
      }
      next();
    },
    async (req, res) => {
      try {
        req.params.id = helpers.checkId(req.params.id, 'ID URL Param');
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        let recipeFound = await recipeData.get(req.params.id);
      } catch (e) {
        return res.status(404).json({ error: e });
      }

      try {
        const newRecipe = await recipeData.addLike(req.params.id, req.session.user.id, req.session.user.username);
        return res.status(200).json(newRecipe);
      } catch (e) {
        if (e === "Error: No recipe found with that ID") { 
          return res.status(404).json({ error: e });
        } else { 
          return res.status(500).json({ error: e });
        }
      }
    });


export default router;