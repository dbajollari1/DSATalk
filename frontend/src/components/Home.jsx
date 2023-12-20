import React, {useContext,useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {getAuth} from 'firebase/auth';

import '../App.css';

function Home() {
  const { currentUser, displayName, setDisplayName} = useContext(AuthContext);
  const [currentUser1, setCurrentUser] = useState(null);
  const auth = getAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [hasReloaded, setHasReloaded] = useState(false);

  useEffect(() => {
    if(displayName.length === 0){
      setDisplayName(currentUser.displayName)
    }
  }, [currentUser]) 


  return (
        <div className='card'>
      <h2>
        Hello {currentUser && displayName }, this is the Protected
        Home page
      </h2>
    </div>
  );
}

export default Home;