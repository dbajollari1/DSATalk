import React, {useContext,useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {getAuth} from 'firebase/auth';

import '../App.css';
import Leaderboard from './Leaderboard';

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
        Hello {currentUser && displayName}!
      </h2>
      <div className='leaderboard'>
        <Leaderboard></Leaderboard>
      </div>
    </div>
  );
}

export default Home;