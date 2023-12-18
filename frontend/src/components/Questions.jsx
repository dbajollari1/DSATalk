import { useState, useContext, useEffect } from 'react'
import viteLogo from '/vite.svg'
import {AuthContext} from '../context/AuthContext';
import "./Search.css";
// import { FaSearch } from "react-icons/fa";
import '../App.css'
import FilterPanel from './FilterPanel';
import allQuestions from "../assets/questionsList.js";
import axios from 'axios';

function Questions() {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
   

    const [topics, setTopics] = useState([
      { id: 1, checked: false, label: 'Arrays' },
      { id: 2, checked: false, label: 'Dynamic Programming' },
      { id: 3, checked: false, label: 'Binary Search' },
      { id: 4, checked: false, label: 'Two Pointers'}
    ]);

    // const [list, setList] = useState(dataList);
    const [checkedItems, setCheckedItems] = useState({});
    const {currentUser} = useContext(AuthContext);
    const [visitedLinkColor, setVisitedLinkColor] = useState('rgb(0, 0, 226)');
    const [results, setResults] = useState([]);
    const [resultsFound, setResultsFound] = useState(true);
    const [input, setInput] = useState("");

    const headers = {
      'Authorization': `Bearer ${currentUser.accessToken}`, 
      'Content-Type': 'application/json',
    }
    console.log(currentUser.accessToken)


    //fetch data from db
    const fetchData = async (value) => {
      try {
      console.log("Getting the data from mongo")
      console.log(value)
        const response = await axios.get("http://localhost:3000/questions", { headers });
      //   console.log(response.data)
        const data_value = response.data;
        console.log(value.toLowerCase())
        const results = data_value.filter((data) => {
          // console.log(data.length)
          console.log(data)
          return (
              // console.log(data)
            data.title &&
            data.title.toLowerCase().includes(value.toLowerCase())
          );
        });
    
        setResults(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
  
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };
    const handleSelectDifficulty = (event, value) =>
    !value ? null : setSelectedDifficulty(value);

  const handleSelectCompany = (event, value) =>
    !value ? null : setSelectedCompany(value);

  const handleChangeChecked = (id) => {
    const cusinesStateList = topics;
    const changeCheckedTopics = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTopics(changeCheckedTopics);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Company Filter
    if (selectedCompany) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.Company) === parseInt(selectedCompany)
      );
    }

    // Difficulty Filter
    if (selectedDifficulty) {
      updatedList = updatedList.filter(
        (item) => item.Difficulty === selectedDifficulty
      );
    }

    // Topics Filter
    const topicsChecked = topics
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (topicsChecked.length) {
      updatedList = updatedList.filter((item) =>
        topicsChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    setResults(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCompany, selectedDifficulty, topics]);

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
                let curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers});                const initialCheckedItems = {};
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
    setResults(allQuestions);
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
    <div className='questions-container'>
      {currentUser && (
        <div className="search-bar-container">
        <Search
        value={input}
        changeInput={(e) => handleChange(e.target.value)}
        />
        <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedDifficulty={selectedDifficulty}
            selectDifficulty={handleSelectDifficulty}
            selectedTopics={selectedTopics}
            selectedTopic={handleSelectTopic}
            topics={topics}
            changeChecked={handleChangeChecked}
          />
        </div>
        </div>
        </div>
        // <div className="search-bar-container">
        // <Search setResults={setResults} />
        // <br/>
        // </div>
)}
        <button onClick={handleSaveButtonClick}>Save question progress</button>
        <br/>
    {results.map((question, index) => (
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
