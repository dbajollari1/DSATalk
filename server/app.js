import express from 'express';
const app = express();
import session from 'express-session';
import configRoutes from './routes/index.js';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" }; // Make sure to replace with your actual service account key
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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dsatalks-b8533.firebaseio.com',
});


app.use(express.json());

app.use(cors());

// Middleware to verify Firebase ID token
export const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  
  try {
    if (idToken === undefined) throw "Error: Null auth cookie"
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use('/',verifyToken);

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