import { useState, useContext, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AuthContext} from '../context/AuthContext';
import '../App.css'

import allQuestions from "../assets/questionsList.js";
import axios from 'axios';

function Questions(props) {
  // console.log(props.results)
  // console.log(typeof(results))
    const [checkedItems, setCheckedItems] = useState({});
    const {currentUser} = useContext(AuthContext);
    const [visitedLinkColor, setVisitedLinkColor] = useState('rgb(0, 0, 226)');
    const [numberProblems, setNumberProblems ]  = useState(0)

    if(props.results.length===0)
    {
      props.results=allQuestions
    }
    useEffect(() => {
      setVisitedLinkColor('rgb(0, 0, 226)')
    }, [visitedLinkColor]);
    // Function to handle checkbox changes
    const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
        const keyToCheck = String(index);

        if (prevCheckedItems.hasOwnProperty(keyToCheck)) {
            prevCheckedItems[keyToCheck] = !prevCheckedItems[keyToCheck];
        } else {
            prevCheckedItems[keyToCheck] = true;
        }

        return { ...prevCheckedItems }; // Return the updated state
    });

    };

    // Function to save user progress
  const handleSaveButtonClick = async () => {
    try {
        if(!currentUser){
          alert("You need to be logged in to save preferences!")
          return
        }

        let emailId = currentUser.email;
        const headers = {
          'Authorization': `Bearer ${currentUser.accessToken}`, 
          'Content-Type': 'application/json',
        };
        
        let curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers});
        
        
        const temp = [];
        for (const key in checkedItems) {
            if (checkedItems[key]) {
              temp.push(parseInt(key));
            }
          }
        const reqData = {
            "questions" : temp
        }  
        let updatedUser = await axios.put(`http://localhost:3000/users/addProblem/${curUser.data._id}`,reqData,{headers})
        if(updatedUser.status === 200){
        alert('User progress saved successfully');
        let curUserUpdated = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers});
        setNumberProblems(curUserUpdated.data.problems.length)
        }
        else{
          alert('Could not save preferences')
        }
    } 
    catch (error) {
        console.error('Error saving user progress', error);
    }
  };
  useEffect(() => {
    // Initialize checkedItems with the problems from the currentUser
    const fetchData = async () => {
        if (currentUser) {
            try {
                // Use asynchronous operations here
                const headers = {
                  'Authorization': `Bearer ${currentUser.accessToken}`, 
                  'Content-Type': 'application/json',
                };
                let emailId = currentUser.email;
                let curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers});                
                const initialCheckedItems = {};
                curUser.data.problems.forEach((problemId) => {
                    initialCheckedItems[problemId] = true;
                });
                setCheckedItems(initialCheckedItems);
                setNumberProblems(curUser.data.problems.length)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
    };

    // Call the asynchronous function
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    return () => {
      // Reset the state of checkedItems when the component is unmounted
      setCheckedItems({});
    };
  }, []); // Empty dependency array means this effect runs once (on mount) and cleans up on unmount

  // Additional cleanup when the user logs out
  useEffect(() => {
    if (!currentUser) {
      // Reset the state of checkedItems when the user logs out
      setCheckedItems({});
    }
  }, [currentUser]); 

  return (
    <div>
        <button onClick={handleSaveButtonClick}>Save question progress</button>
        <br></br>
        {currentUser &&   (
          <div className='solved-problems'>
        <p> You have solved {numberProblems} problems so far </p>
        </div>
        )
    }
    {props.results.map((question, index) => (
        <div className='question-container' key={index}>
        <input type='checkbox'
          checked={checkedItems[index] || false}
          onChange={() => handleCheckboxChange(index)}
        />
      <div className='question' key={index}>
        
        <a href={question.link} target='_blank' rel='noopener noreferrer' style={{ color: visitedLinkColor }}>
          <h4>{question.title}</h4>
        </a>
      </div>
      </div>
    ))}
  </div>
  )
}

export default Questions
