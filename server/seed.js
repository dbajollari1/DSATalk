import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import discussions from "./data/discussions.js";
import users from "./data/users.js";
import questions from './data/questions.js';
import comments from "./data/comments.js";
import replies from "./data/replies.js";

import allQuestions from './data/questionsList.js';

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




let user1 = await users.createUser("David Bajollari", "david123", "Pryan@1234");
let user2 = await users.createUser("Ryan Bajollari", "ryan123", "Pryan@1234");

console.log(user1);
console.log(user2);

let discussion1 = await discussions.create("Test Discussion", user1._id,user1.username,"This is a test discussion. Hello! What are some of the hardest problems on leetcode?",["Medium", "Dynamic"],"", "https://leetcode.com/problems/maximum-subarray/");
console.log(discussion1)
let discussion2 = await discussions.create("Test Discussion 2", user1._id,user1.username,"This is a test discussion 2. Greetings! I have a lot of trouble with binary tree questions, what about you guys?","", "", "https://leetcode.com/problems/binary-tree-level-order-traversal/");
console.log(discussion2)


let discussion3 = await discussions.create("Test Discussion 3", user2._id,user2.username,"This is a test discussion 3. How is everyone doing? I am excited to learn more about DSA, let's go!","", "", "");
console.log(discussion3)
let discussion4 = await discussions.create("Test Discussion 4", user2._id,user2.username,"This is a test discussion 4. Hi everyone! What is everyone's favorite leetcode question?",["hard","graphs"], "", "https://leetcode.com/problems/number-of-islands/");
console.log(discussion4)


let allDiscussions = await discussions.getAll(1);
console.log(allDiscussions)

let comment1Discussion1 = await comments.create(discussion1._id,user2._id,user2.username,"This is my first comment. What do you all think about it? ")
console.log(comment1Discussion1); 
let comment2Discussion1 = await comments.create(discussion1._id,user1._id,user1.username,"This is me commenting from my own post. What do you all think?")
console.log(comment2Discussion1); 


let comment1Discussion2 = await comments.create(discussion2._id,user1._id,user2.username,"This is my first comment. What do you all think about it? ")
console.log(comment1Discussion2); 
let comment2Discussion2 = await comments.create(discussion2._id,user2._id,user1.username,"This is me commenting from my own post. What do you all think?")
console.log(comment2Discussion2); 


let getDiscussion1 = await discussions.get(discussion1._id); 
console.log(getDiscussion1)
let getDiscussion2 = await discussions.get(discussion2._id); 
console.log(getDiscussion2)


let reply1Comment1Discussion1 = await replies.create(discussion1._id,comment1Discussion1._id,user1._id,user1.username,"Thats nice, hope you enjor the site!");
console.log(reply1Comment1Discussion1)
let reply2Comment1Discussion1 = await replies.create(discussion1._id,comment1Discussion1._id,user2._id,user2.username,"Awesome, really liking the site");
console.log(reply2Comment1Discussion1)

let reply1Comment2Discussion1 = await replies.create(discussion1._id,comment2Discussion1._id,user2._id,user2.username,"Lets learn DSA!");
console.log(reply1Comment2Discussion1)
let reply2Comment2Discussion1 = await replies.create(discussion1._id,comment2Discussion1._id,user1._id,user1.username,"Great site idea!");
console.log(reply2Comment2Discussion1)


let reply1Comment1Discussion2 = await replies.create(discussion2._id,comment1Discussion2._id,user2._id,user2.username,"Lets learn DSA!");
console.log(reply1Comment1Discussion2)
let reply2Comment1Discussion2 = await replies.create(discussion2._id,comment1Discussion2._id,user1._id,user1.username,"Great site idea!");
console.log(reply2Comment1Discussion2)


let getAgainDiscussion1 = await discussions.get(discussion1._id); 
console.log(getAgainDiscussion1)
let getAgainDiscussion2 = await discussions.get(discussion2._id); 
console.log(getAgainDiscussion2)

await closeConnection();





