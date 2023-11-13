import * as helpers from "../helpers.js"; 
import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs'; 
const saltRounds = 12;


/* will change currently same code as lab 1, will use as a shell */
const createUser = async (
  name,
  username,
  password,
) => {
  if(!name || !username || ! password) throw "Error: Not all neccessary fields passed to function!";

  name = helpers.validateName(name); 
  username = helpers.validateUsername(username);
  password = helpers.validatePassword(password);

  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if(user) throw "Error: User already exists with that username!"; 

  const hash = await bcrypt.hash(password, saltRounds);
  
  let newUser = {
    name: name,
    username: username,
    password: hash
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new user!';

  const updatedUserCollection = await users();
  let createdUser = await updatedUserCollection.findOne({ _id: new ObjectId(insertInfo.insertedId.toString()) });
  if (!createdUser) throw 'Error: Could not create user!';

  let returnObj = {
    "_id": createdUser._id.toString(), 
    "name": createdUser.name,
    "username": createdUser.username
  }

  return returnObj;
};

const checkUser = async (username, password) => {
  if(!username || !password) throw "Error: Not all neccessary fields passed to function!";
 
  username = helpers.validateUsername(username);

  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if(!user) throw "Error: Either the username or password are invalid"; 

  password = helpers.validatePassword(password);

  let compareWithHash = false; 
  compareWithHash = await bcrypt.compare(password, user.password);
  if(!(compareWithHash)) throw "Error: Either the email address or password are invalid";

  let returnObj = {"id": user._id.toString(), "name": user.name, "username": user.username}; 

  return returnObj;
};


export default {createUser,checkUser}; 