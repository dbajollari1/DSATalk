import React from 'react';
import {doSocialSignIn} from '../firebase/FirebaseFunctions';
import axios from 'axios';

const updateUserSignOn = async (accessToken,email,displayName) => {
    
  try {


    const headers = {
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json',
    };
    
    const response = await axios.post('http://localhost:3000/users/signOnSyncUser', {
      email: email,
      username: displayName
      // Add other user data as needed
    }, {headers});

    } catch (error) {
    // Handle errors
    alert('Error saving user to backend:' + error.message);
  }
};
const SocialSignIn = () => {
  const socialSignOn = async () => {
    try {
      const social = await doSocialSignIn();
      await updateUserSignOn(social.user.accessToken, social.user.email, social.user.displayName)
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn()}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      />
    </div>
  );
};

export default SocialSignIn;
