
//just skeleton code for now

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


export default { create, getAll, get, remove };