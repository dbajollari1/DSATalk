import {React, useState} from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import '../App.css';

const SignOutButton = () => {

  const handleSignOut = async () => {
    await doSignOut();
  };

  return (
    <button className="button-signout" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};

export default SignOutButton;