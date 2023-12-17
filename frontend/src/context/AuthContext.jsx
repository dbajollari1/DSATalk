import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import axios from 'axios';
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    let myListener = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
      }
      setLoadingUser(false);
    });
    return () => {
      if (myListener) myListener();
    };
  },[auth, currentUser]);

  

  if (loadingUser) {
    return (
      <div>
        <h1>Loading....Loading....Loading....Loading....Loading....</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, displayName, setDisplayName }}
    >
      {children}
    </AuthContext.Provider>
  );
};