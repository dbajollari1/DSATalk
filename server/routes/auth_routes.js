import { Router } from 'express';
const router = Router();
import { userData } from "../data/index.js";
import * as helpers from "../helpers.js";


router
  .route('/signup')
  .post(
    (req, res, next) => {
      if (req.session.user) {
        return res.status(401).json({error: "Cannot create user while already signed in!"})
      }
      next();
    },
    async (req, res) => {
    const signupInfo = req.body;
    try {
      if (!signupInfo || Object.keys(signupInfo).length === 0) throw 'There are no fields in the request body'; 
      if (!signupInfo.firstName || !signupInfo.lastName ||!signupInfo.username || !signupInfo.password) throw 'Not all neccessary fields provided in request body';
      
      signupInfo.name = helpers.validateName(signupInfo.name);
      signupInfo.username = helpers.validateUsername(signupInfo.username);
      signupInfo.password = helpers.validatePassword(signupInfo.password);

      const createdUser = await userData.createUser(signupInfo.name, signupInfo.username, signupInfo.password);
      req.session.user = createdUser;
      res.status(200).json(createdUser);
    } catch (e) {
      return res.status(400).json({"error": e});
    }

  });

router
  .route('/login')
  .post(
    (req, res, next) => {
      if (req.session.user) {
        return res.status(400).json({error: "User already signed in!"})
      }
      next();
    },
    async (req, res) => {
    const loginInfo = req.body;
    try {
      if (!loginInfo || Object.keys(loginInfo).length === 0) throw 'There are no fields in the request body';
      if (!loginInfo.username || !loginInfo.password) throw 'Not all neccessary fields provided in request body';

      loginInfo.username = helpers.validateUsername(loginInfo.username);
      loginInfo.password = helpers.validatePassword(loginInfo.password);


      //user firebase auth to check if user exists and if so log them in
      const loggedInUser = await userData.checkUser(loginInfo.username,loginInfo.password);
      req.session.user = loggedInUser;
      return res.status(200).json(loggedInUser);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });





router.route('/logout').get(
  (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json("Cannot logout when no user is sigend in"); 
    }
    next();
  },
  async (req, res) => {
    //here we will use the firebase auth to log out the user
    req.session.destroy();
    return res.status(200).json("You have been successfully logged out"); 
});


export default router;