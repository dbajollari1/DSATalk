import * as helpers from "../helpers.js"; 
import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';



const findUserByEmail = async(email) =>{
  if(!email){
    throw "Please provide an email" 
  }

  const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
  if(!user) throw "Error: Either the user does not exist";

  return user;
}

const findUserById = async(id) =>{
  if(!id){
    throw "Please provide an id" 
  }

  const userCollection = await users();
  const user = await userCollection.findOne({ '_id': new ObjectId(id) });
  if(!user) throw "Error: Either the user does not exist";

  return user;
}
const updateUserProbelms = async(id,questions) => {
    if (id === undefined) throw 'No id provided';
  if (!questions) throw 'No questions provided';
  const userCollection = await users();
  // we use $set to update only the fields specified
  await userCollection.updateOne(
    {_id: new ObjectId(id)},
    {$set: {'problems': questions}}
  );

  const updatedUser = await findUserById(id);
    return updatedUser;
}


const createUserSignOnSyncUser = async (
  email,
  username
) => {
  email = email.toLowerCase();
  if(!email || !username) throw "Error: Not all neccessary fields passed to function!";
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  if(user){
    return {
      "_id": user._id.toString(), 
      "email": user.email,
      "username": user.username
    }
  
  }
  
  let newUser = {
    email: email,
    username: username,
    problems : []
  
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new user!';

  const updatedUserCollection = await users();
  let createdUser = await updatedUserCollection.findOne({ _id: new ObjectId(insertInfo.insertedId.toString()) });
  if (!createdUser) throw 'Error: Could not create user!';

  let returnObj = {
    "_id": createdUser._id.toString(), 
    "email": createdUser.email,
    "username": createdUser.username
  }

  return returnObj;
};
const createUserSignOn = async (
  email,
  username
) => {
    if(!email || !username) throw "Error: Not all neccessary fields passed to function!";

  
  const userCollection = await users();
  email = email.toLowerCase()
  const user = await userCollection.findOne({ email: email });
  if(user) throw "Error: User already exists with that username!"; 

  
  let newUser = {
    email: email,
    username: username,
    problems : []
  
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new user!';

  const updatedUserCollection = await users();
  let createdUser = await updatedUserCollection.findOne({ _id: new ObjectId(insertInfo.insertedId.toString()) });
  if (!createdUser) throw 'Error: Could not create user!';

  let returnObj = {
    "_id": createdUser._id.toString(), 
    "email": createdUser.email,
    "username": createdUser.username
  }

  return returnObj;
};

export default {findUserByEmail,updateUserProbelms,findUserById,createUserSignOn,createUserSignOnSyncUser}; 