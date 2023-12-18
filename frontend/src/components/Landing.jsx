import {React, useState} from 'react';
import Questions from './Questions';
import '../App.css';
import Search from './Search'

function Landing() {
  const [results, setResults] = useState([]);

  return (
    <div className="outer-bar">
      <div className='Search-and-filter'><Search setResults={setResults}/></div>
    <div className='card'>
      {console.log(typeof(results))}
       
      <h1> Welcome to DSAtalk!</h1>
      <p> list of blind 75 questions </p>
     
      <Questions results={results}/>
    </div>
    </div>
  );
}

export default Landing;