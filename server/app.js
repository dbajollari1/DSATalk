import express from 'express';
const app = express();
import session from 'express-session';
import configRoutes from './routes/index.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';

const client = createClient({url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT});
// const client = createClient({
//   socket: {
//      port: process.env.REDIS_PORT,
//      host: '172.18.0.2'
//     }
// });
client.connect().then(() => {});

app.use(express.json());

app.use(cors());

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret for the CS554 Final Project",
    saveUninitialized: false,
    resave: false
  })
);


// const pathsAccessed = {};


// app.use(async (req, res, next) => {
//   //let timestamp = new Date().toUTCString();
//   let reqMethod = req.method; 
//   let reqBody = { ...req.body }; 
//   if (reqMethod === "GET") { 
//     reqBody = {} 
//   }
//   let reqPath = req.originalUrl;
//   if (reqPath in pathsAccessed) { 
//     pathsAccessed[reqPath] = pathsAccessed[reqPath] + 1;
//   } else { 
//     pathsAccessed[reqPath] = 1 
//   }

//   if ("password" in reqBody) { 
//     delete reqBody["password"]; 
//   }

//   //console.log(`[${timestamp}]: ${reqMethod} ${reqPath} ${userType}`);
//   console.log(
//     `There have now been ${pathsAccessed[reqPath]} requests made to ${
//       req.path} using a ${reqMethod} method.`);

//   console.log("Request Body: ")
//   console.log(reqBody);
//   next();
// });
configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});