import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.js'; 
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';
console.log(process.env.REDIS_HOST)

const redisClient = createClient({url: 'redis://' + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT});
redisClient.connect().then(() => {});

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
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use('/',verifyToken);


configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});