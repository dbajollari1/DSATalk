import React from 'react';
import Questions from './Questions';
import '../App.css';

function Landing() {
  return (
    <div className='card'>
      <h1> Welcome to DSAtalk!</h1>
      <p> list of blind 75 questions </p>
      <Questions/>
    </div>
  );
}

export default Landing;