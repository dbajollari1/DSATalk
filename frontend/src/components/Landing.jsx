import {React, useState, useContext} from 'react';
import Questions from './Questions';
import '../App.css';
import Search from './Search'
import { AuthContext } from '../context/AuthContext';
import allQuestions from "../assets/questionsList.js";
import Filters from './Filters';

function Landing() {
  const [dataresults, setDataResults] = useState([])
  const [results, setResults] = useState([]);

  

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="outer-bar">
      {currentUser && (
        <div className='Search-and-filter'>
          <div className='search-div'>
          <Search setResults={setResults} 
          setDataResults= {setDataResults}
          />
          </div>
          <div className='filter-div'>
          {/* Pass all selected filters to Filters component */}
          <Filters setDataResults={setDataResults} results={results.length > 0 ? results : allQuestions} />
          </div>
        </div>
      )}
    <div className='card'>
      {console.log(typeof(results))}
    
       
      <h1> Welcome to DSAtalk!</h1>
      <h2> List of blind 75 questions </h2>
      {currentUser
          ? (dataresults.length > 0 ? (
            <Questions results={dataresults} />
          ) : (
            <div className="no-questions-message">No questions found!</div>
          ))
          : <Questions results={allQuestions} />
        }
    </div>
    </div>
  );
}

export default Landing;