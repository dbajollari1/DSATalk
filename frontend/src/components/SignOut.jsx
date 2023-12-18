import {React, useState} from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut(navigate);
  };

  return (
    <button className="button-signout" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};

export default SignOutButton;