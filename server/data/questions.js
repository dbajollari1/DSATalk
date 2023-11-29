import * as helpers from "../helpers.js"; 
import {questions} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';


const createQuestion = async (
  title,
  link,
  difficulty,
  topics,
  companies
) => {
  if(!title || !link || ! difficulty || !topics || ! companies) throw "Error: Not all neccessary fields passed to function!";

  
  const questionCollection = await questions();
  const question = await questionCollection.findOne({ title: title });
  if(question) throw "Error: Question already exists in the list!"; 

  
  
  let newQuestion = {
    title: title,
    link: link,
    difficulty: difficulty,
    topics: topics,
    companies: companies
  };

  const insertInfo = await questionCollection.insertOne(newQuestion);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new user!';

  const updatedQuestionCollection = await questions();
  let createdQuestion = await updatedQuestionCollection.findOne({ _id: new ObjectId(insertInfo.insertedId.toString()) });
  if (!createdQuestion) throw 'Error: Could not create question!';

  let returnObj = {
    "_id": createdQuestion._id.toString(), 
    "title": createdQuestion.title,
    "link": createdQuestion.link
  }

  return returnObj;
};


const getAllQuestions = async () => {
    const questionCollection = await questions();
    let allQuestions = await questionCollection.find({}).toArray();
    if (allQuestions.length === 0) {
        throw { statusCode: 404, error: "No Questions in the Database" };
    }
    allQuestions.forEach((element) => {
        element._id = element._id.toString();
    });
    return allQuestions;
    };
    

export default {createQuestion,getAllQuestions}; 