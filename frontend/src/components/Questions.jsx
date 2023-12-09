import { useState, useContext, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AuthContext} from '../context/AuthContext';
import '../App.css'

import allQuestions from "../assets/questionsList.js";
import axios from 'axios';

function Questions() {
    const [checkedItems, setCheckedItems] = useState({});
    const {currentUser} = useContext(AuthContext);


    // Function to handle checkbox changes
    const handleCheckboxChange = (index) => {
        console.log(checkedItems);

    setCheckedItems((prevCheckedItems) => {
        const keyToCheck = String(index);

        if (prevCheckedItems.hasOwnProperty(keyToCheck)) {
            prevCheckedItems[keyToCheck] = !prevCheckedItems[keyToCheck];
        } else {
            prevCheckedItems[keyToCheck] = true;
        }

        return { ...prevCheckedItems }; // Return the updated state
    });

    console.log("checked = ", checkedItems);
    };

    // Function to save user progress
  const handleSaveButtonClick = async () => {
    try {

        let emailId = currentUser.email;
        let curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`);
        console.log("Checked id = ",curUser.data._id)
        console.log("Checked list = ",checkedItems)
        const temp = [];
        for (const key in checkedItems) {
            if (checkedItems[key]) {
              // Do something with each key
              temp.push(parseInt(key));
            }
          }
        console.log("temp = ",temp)
        const reqData = {
            "questions" : temp
        }  
        let updatedUser = await axios.put(`http://localhost:3000/users/addProblem/${curUser.data._id}`,reqData)
        console.log("Updated user = ",updatedUser.data)
        console.log('User progress saved successfully');
    } 
    catch (error) {
        console.error('Error saving user progress', error);
    }
  };
  useEffect(() => {
    // Initialize checkedItems with the problems from the currentUser
    const fetchData = async () => {
        console.log("Fired ");
        //console.log("current user ", currentUser);
        if (currentUser) {
            try {
                // Use asynchronous operations here
                let emailId = currentUser.email;
                let curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`);
                console.log("Current user ",curUser)
                const initialCheckedItems = {};
                curUser.data.problems.forEach((problemId) => {
                    initialCheckedItems[problemId] = true;
                });
                setCheckedItems(initialCheckedItems);
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
    {allQuestions.map((question, index) => (
        <div className='question-container' key={index}>
        <input type='checkbox'
          checked={checkedItems[index] || false}
          onChange={() => handleCheckboxChange(index)}
        />
      <div className='question' key={index}>
        
        <a href={question.link} target='_blank' rel='noopener noreferrer'>
          <h4>{question.title}</h4>
        </a>
      </div>
      </div>
    ))}
  </div>
  )
}

export default Questions
