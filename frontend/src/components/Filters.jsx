import { useState, useContext, useEffect } from 'react'


const Filters = ({setDataResults,results}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedTopics, setSelectedTopics] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isResultsFound, setIsResultsFound] = useState(true);
  
  const handleDropdownChange = (e) => {
    // Use the name attribute to differentiate between dropdowns
    const { name, value } = e.target;
    if (name === 'dropdown-difficulty') {
      setSelectedDifficulty(value);
    } else if (name === 'dropdown-topics') {
      setSelectedTopics(value);
    } else if (name === 'dropdown-company') {
      setSelectedCompany(value);
    }
  };

    // Apply filters
    const applyFilters = () => {
      let updatedList = [...results];
      console.log(results)
  
      // Company Filter
      if (selectedCompany && selectedCompany !== 'select') {
        updatedList = updatedList.filter((item) => {
          console.log(item)
          if(item.companies){
            for (const company of item.companies) {
              if (company.toLowerCase() === selectedCompany.toLowerCase()) {
                return true;
              }
            }
          }
          return false;
        });
      }
    console.log(updatedList)
      // Difficulty Filter
      if (selectedDifficulty && selectedDifficulty !== 'select') {
        updatedList = updatedList.filter(
          (item) => item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
        );
      }
      console.log(updatedList)
  
      // Topics Filter

      if (selectedTopics && selectedTopics !== 'select') {
        updatedList = updatedList.filter((item) => {
          if(item.tags){
            console.log(item)
            for (const topic of item.tags) {
              if (topic.toLowerCase() === selectedTopics.toLowerCase()) {
                return true;
              }
            }
          }
            return false;
          
        });
      }
    
      if (updatedList.length !== 0) {
        setDataResults(updatedList);
        setIsResultsFound(true);
      } else {
        setDataResults([]);
        setIsResultsFound(false);
      }
      // Update results with the filtered list


      console.log(updatedList);
    };
  
    // React to changes in the filter values or the search input
    useEffect(() => {
      applyFilters();
      console.log(selectedCompany)
      console.log(selectedDifficulty)
      console.log(selectedTopics)
    }, [selectedCompany,selectedTopics,selectedDifficulty]);
 
  

  return (
    <div>
     <div className="sec-center">
            {/* Dropdown 1 */}
            <select name="dropdown-difficulty" className="dropdown-difficulty" onChange={handleDropdownChange}>
              <option value="select">Select Difficulty Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Dropdown 2 */}
            <select name="dropdown-topics" className="dropdown-topics" onChange={handleDropdownChange}>
              <option value="select">Select Topics</option>
              <option value="arrays">Arrays</option>
              <option value="dynamic programming">Dynamic Programming</option>
              <option value="binary search">Binary Search</option>
              <option value="hashing">Hashing</option>
              <option value="two pointers">Two Pointers</option>
            </select>

            {/* Dropdown 3 */}
            <select name="dropdown-company" className="dropdown-company" onChange={handleDropdownChange}>
              <option value="select">Select Company</option>
              <option value="tesla">Tesla</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
              <option value="microsoft">Microsoft</option>
              <option value="synopsys">Synopsys</option>
              <option value="meta">Meta</option>

            </select>
            </div>
    </div>
  )
}

export default Filters;
