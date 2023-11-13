import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';


/* will change currently same code as lab 1, will use as a shell */
const create = async (
    title,
    ingredients,
    skillLevel,
    steps,
    userId,
    username
) => {
    title = helpers.checkTitle(title,"title"); 
    ingredients = helpers.checkIngredientsArr(ingredients,"ingredients array");
    skillLevel = helpers.checkSkillLevel(skillLevel,"skill level");
    steps = helpers.checkStepsArr(steps,"steps array"); 

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";

    let reviews = []; 
    let likes = []; 
    let user = {"_id": new ObjectId(userId), "username": username}
    let newRecipe = { 
        title: title, 
        ingredients: ingredients, 
        skillLevel: skillLevel, 
        steps: steps, 
        user: user,
        reviews: reviews, 
        likes: likes,
    }; 


    const recipeCollection = await recipes();
    const insertInfo = await recipeCollection.insertOne(newRecipe);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new recipe!';
  
    const newId = insertInfo.insertedId.toString();
  
    const recipe = await get(newId);
    return recipe;
}

const getAll = async (pageNum) => {
    //code adapted from, getAllDogs() function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    let skipVal = 0;
    let limitVal = 50; 
    if (pageNum > 1) {
        for(let i = 1; i < pageNum; i++) { 
            skipVal += 50; 
        }
    }
    const recipeCollection = await recipes();
    let recipeList = await recipeCollection.find({}).skip(skipVal).limit(limitVal).toArray();
    if (!recipeList) throw 'Error: Could not get all recipes!';
    
    recipeList = recipeList.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    return recipeList;
};


const get = async (id) => {
    //code adapted from, getDogById(id) function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    if (!id) throw "Error: No ID passed to function!";
    id = helpers.checkId(id, "ID")
    const recipeCollection = await recipes();
    const recipe = await recipeCollection.findOne({ _id: new ObjectId(id) });
    if (recipe === null) throw "Error: No recipe found with that ID";
    recipe._id = recipe._id.toString();
    return recipe;
};


const remove = async (id) => {
    //code adapted from, removeDog(id) function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    if (!id) throw "Error: No ID passed to function!";
    id = helpers.checkId(id, "ID")
    const recipeCollection = await recipes();

    const deletionInfo = await recipeCollection.findOneAndDelete({
        _id: new ObjectId(id)
    });
    if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete recipe with id of ${id}`;
    }
    return `${deletionInfo.value.title} has been successfully deleted!`;
};


const update = async (
    recipeId,
    title,
    ingredients,
    skillLevel,
    steps,
    userId,
    username
) => {
    recipeId = helpers.checkId(recipeId, "Recipe ID"); 
    userId = helpers.checkId(userId, "User ID"); 
    username = helpers.validateUsername(username); 

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";


    const recipe = await get(recipeId);

    if (recipe.user._id.toString() !== userId) throw "Error: Cannot update other users recipe!"
    if (recipe.user.username !== username) throw "Error: Cannot update other users recipe!"
    
    if (title !== null) { 
        title = helpers.checkTitle(title,"title"); 
        if (title === recipe.title) throw "Error: Cannot update recipe field with same values as before!";
    } else { 
        title = recipe.title; 
    }

    if (ingredients !== null) { 
        ingredients = helpers.checkIngredientsArr(ingredients,"ingredients"); 
        if (ingredients === recipe.ingredients) throw "Error: Cannot update recipe field with same values as before!";
    } else { 
        ingredients = recipe.ingredients; 
    }

    if (skillLevel !== null) { 
        skillLevel = helpers.checkSkillLevel(skillLevel,"skill level"); 
        if (skillLevel === recipe.skillLevel) throw "Error: Cannot update recipe field with same values as before!";
    } else { 
        skillLevel = recipe.skillLevel; 
    }

    if (steps !== null) { 
        steps = helpers.checkStepsArr(steps,"steps"); 
        if (steps === recipe.steps) throw "Error: Cannot update recipe field with same values as before!";
    } else { 
        steps = recipe.steps; 
    }


    let updatedRecipe = { 
        title: title, 
        ingredients: ingredients, 
        skillLevel: skillLevel, 
        steps: steps, 
        user: recipe.user,
        reviews: recipe.reviews, 
        likes: recipe.likes,
    }; 
    const recipeCollection = await recipes();
  
    const updatedInfo = await recipeCollection.findOneAndUpdate(
      {_id: new ObjectId(recipeId)},
      {$set: updatedRecipe},
      {returnDocument: 'after'}
    );

    const newRecipe = await get(recipeId);
    return newRecipe;

};

const addLike = async (
    recipeId, 
    userId, 
    username
) => {
    if (!recipeId || !userId || !username) throw "Error: All fields need to have valid values!";
    recipeId = helpers.checkId(recipeId, "recipeId");
    userId = helpers.checkId(userId, "userId");
    username = helpers.validateUsername(username,"username");

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";
  
    const recipeCollection = await recipes();
    const recipe = await recipeCollection.findOne({ _id: new ObjectId(recipeId) });
    if (recipe === null) throw "Error: No recipe found with that ID";

    let curLikes = recipe.likes; 
    let addLike = true; 
    let removeLike = false
    for(let i = 0; i < curLikes.length; i++) { 
        if (userId === curLikes[i]) { 
            removeLike = true; 
            addLike = false;
        }
    }
    let updatedInfo = 0;
    if (addLike) { 
        updatedInfo = await recipeCollection.findOneAndUpdate(
            { _id: new ObjectId(recipeId) },
            { $push: { likes: userId } },
            { returnDocument: 'after' }
          );
    } else if (removeLike) { 
        updatedInfo = await recipeCollection.findOneAndUpdate(
            { _id: new ObjectId(recipeId) },
            { $pull: { likes: userId } },
            { returnDocument: 'after' }
          );
    }


    const updatedRecipeCollection = await recipes();
    const updatedRecipe = await updatedRecipeCollection.findOne({ _id: new ObjectId(recipeId) });
    updatedRecipe._id = updatedRecipe._id.toString();
    
    return updatedRecipe; 
}  

export default {create, getAll, get, remove, update, addLike}; 
