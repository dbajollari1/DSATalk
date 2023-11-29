import questions from './data/questions.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import allQuestions from './data/questionsList.js';
//lets drop the database each time this is run

const db = await dbConnection();
await db.dropDatabase();

let question = null;
//let allQuestions = null;
const questionData = allQuestions  
  for (const data of questionData) {
    try {
       question = await questions.createQuestion(data.title, data.link, data.difficulty, data.tags, data.companies);
       console.log(question)
    } catch (e) {
      console.log(e);
    }
  }


console.log("Number of questions = ",allQuestions.length)	
   

await closeConnection();
console.log('Done!');