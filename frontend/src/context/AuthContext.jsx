import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import axios from 'axios';
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    let myListener = onAuthStateChanged(auth, (user) => {
      if(user){
      setCurrentUser(user);
      saveUserToBackend(user);
      }
      console.log('onAuthStateChanged', user);
      setLoadingUser(false);
    });
    return () => {
      if (myListener) myListener();
    };
  }, []);

  // function to make a backend request to save current user to mongodb
  const saveUserToBackend = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/users/addUser', {
        email: user.email,
        username: user.displayName,
        // Add other user data as needed
      });

      } catch (error) {
      // Handle errors
      console.error('Error saving user to backend:', error.message);
    }
  };

  if (loadingUser) {
    return (
      <div>
        <h1>Loading....Loading....Loading....Loading....Loading....</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};