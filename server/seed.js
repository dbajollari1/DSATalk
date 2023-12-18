import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import discussions from "./data/discussions.js";
import users from "./data/users.js";
import questions from './data/questions.js';
import comments from "./data/comments.js";
import replies from "./data/replies.js";
import * as helpers from "./helpers.js";

import allQuestions from './data/questionsList.js';

const db = await dbConnection();
await db.dropDatabase();


let question = null;
//let allQuestions = null;
const questionData = allQuestions  
  for (const data of questionData) {
    try {
       question = await questions.createQuestion(data.title, data.link, data.difficulty, data.tags, data.companies);
      //  console.log(question)
    } catch (e) {
      console.log(e);
    }
  }

console.log("Number of questions = ",allQuestions.length)	


let user1Id ="jnufu37gWgQmmnBFhjFkty4sxiH3"
let user1Username = "Sanika"
let user1Email = "sanikac785@gmail.com" 
let user1 = await users.createUserSignOn(user1Email,user1Username); 

let user2Id ="hRLa1SUsuhVVQv6bHLP9dshpN7e2"
let user2Username = "Mahesh"
let user2Email = "mahesh@gmail.com" 
let user2 = await users.createUserSignOn(user2Email,user2Username); 

let user3Id = "eZTg5Xu7h3YGXHN9CZ0jCuHDisQ2"
let user3Username = "David"
let user3Email = "david123@gmail.com" 
let user3 = await users.createUserSignOn(user3Email,user3Username); 

let user4Id ="9mubo7xyUjXhI1AL4VDDB5MPwEY2"
let user4Username = "dsa"
let user4Email = "dsa123@gmail.com" 
let user4Password = "Dsa123!@#"
let user4 = await users.createUserSignOn(user4Email,user4Username); 

let user5Id =""
let user5Username = ""
let user5Email = "" 


let discussion1 = await discussions.create("Was asked this question by google", user1._id,user1.username,"Hello everyone I recently had an interview with google and I was wondering if anyone can help me. They asked me a variation of the decode ways. Can anyone offer me a solution in python?",["Medium", "Dynamic", "Google"],"", "https://leetcode.com/problems/decode-ways/");
let discussion2 = await discussions.create("Binary trees", user1._id,user1.username," Greetings! I have a lot of trouble with binary tree questions, what about you guys? Are there any tips you can give me",["Binary Tree"], "", "");


let discussion3 = await discussions.create("Favorite DSA question", user2._id,user2.username," How is everyone doing? I am excited to learn more about DSA, and i was wondering does anyone have a favorite questins? Mine is number of islands","", "", "");
let discussion4 = await discussions.create("Graph Problems", user2._id,user2.username," Hi everyone! Do you guys struggle with graph problems. If so I really recommend doing the problem number of islands. Let me know if you need someone to walk you through it!",["hard","graphs"], "", "https://leetcode.com/problems/number-of-islands/");


let discussion5 = await discussions.create("Have you guys heard about neetcode?", user3._id,user3.username,"Hi everyone, I just heard about this new site called neetcode. Have any of you tried it? If so what do you think?","", "", "https://neetcode.io/");
let discussion6 = await discussions.create("What is the worst DSA question of all time?", user3._id,user3.username," Hey guys. Are there any leetcode problems you really hate? I am not a fan of lru cache, it is too tedious.",["Hard","Goolge"], "", "https://leetcode.com/problems/lru-cache/");


let discussion7 = await discussions.create("Was asked this by Affirm", user4._id,user4.username,"I was asked a question by affirm where I had to find the shorted unique substring in a list of names. I could not solve it. Has anyone seen this problem?",["Affirm", "lists"], "", "");
let discussion8 = await discussions.create("Meta inteview Question", user4._id,user4.username," Hi everyone! I recently had an interview with Meta and got really lucky. They asked me to reverse a linked list. Thankfully I got the optimal solution",["Meta","Linked List"], "", "https://leetcode.com/problems/reverse-linked-list/");


let discussion9 = await discussions.create("Apple new grad", user1._id,user1.username," How is everyone doing? I have an upcoming interview with Apple for a new grad position. Can anyone give me some of the question they have been asked before?",["Apple", "Question types"], "", "");
let discussion10 = await discussions.create("Graph Problems", user2._id,user2.username,"I just had a really tough interview with Microsoft. They asked me all about differnt ways of traversing graphs. I hope I did well, let me know if anyone has any questions?",["Microsoft","graphs"], "", "");



let comment1Discussion1 = await comments.create(discussion1._id,user2._id,user2.username,"That is a dynammic programming problem. Those are the hardest for me. Good luck!")
let comment2Discussion1 = await comments.create(discussion1._id,user3._id,user3.username,"You should practice with recursion and then learn about tabulation. That is a hard problem so start smaller!")
let reply1Comment2Discussion1 = await replies.create(discussion1._id,comment2Discussion1._id,user2._id,user2.username,"I could not agree more, focus on the basics then work your way up");



let comment1Discussion5 = await comments.create(discussion5._id,user1._id,user2.username,"That site is the best, been using it for over a year. Checkout his youtube too!");
let reply1Comment1Discussion5 = await replies.create(discussion5._id,comment1Discussion5._id,user3._id,user3.username,"Thanks, I will take a look");

let comment1Discussion2 = await comments.create(discussion2._id,user2._id,user1.username,"Binary trees were hard for me. Really focus on recursion and the call stack, and then learn all about traversals!")

let comment1Discussion9 = await comments.create(discussion9._id,user3._id,user3.username,"I interviewed with them recently. They asked me 2sum and lru cache. I thought I did well but never heard back")
let reply1comment1Discussion9 = await replies.create(discussion9._id,comment1Discussion9._id,user1._id,user1.username,"Yeah I have been told they ghost a lot. Thanks");

let comment1Discussion7 = await comments.create(discussion7._id,user2._id,user2.username,"Yeah I had the exact same question, could not solve it sadly.");
let comment2Discussion7 = await comments.create(discussion7._id,user3._id,user3.username,"Try and start with a brute force solution. You are gonna have to do a lot of for loops and use a map");


let reply1comment2Discussion7 = await replies.create(discussion7._id,comment2Discussion7._id,user1._id,user1.username,"Yeah I think that is the right way to go about it");

let comment1Discussion8 = await comments.create(discussion8._id,user1._id,user1.username,"Thanks for letting us know!");

let comment1Discussion3 = await comments.create(discussion3._id,user1._id,user1.username,"Mine has to be group anagrams");
let comment1Discussion4 = await comments.create(discussion4._id,user3._id,user3.username,"Yeah this is a really important problem, was asked it so many times");



await closeConnection();





