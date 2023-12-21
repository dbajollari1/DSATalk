import { useState, useContext } from "react";
 import { FaSearch } from "react-icons/fa";
 import { AuthContext } from "../context/AuthContext";
 import axios  from "axios";

 import "../App.css";

 const Search = ({ setResults,setDataResults }) => {
    const {currentUser} = useContext(AuthContext);
   const [input, setInput] = useState("");
   const headers = {
     'Authorization': `Bearer ${currentUser.accessToken}`, 
     'Content-Type': 'application/json',
   }

   const fetchData = async (value) => {
     try {
     console.log("Getting the data from mongo")
       const response = await axios.get("http://localhost:3000/questions", { headers });
       const data_value = response.data;
       const results = data_value.filter((data) => {
         return (
           data.title &&
           data.title.toLowerCase().includes(value.toLowerCase())
         );
       });

       setResults(results);
       setDataResults(results);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };


   const handleChange = (value) => {
     setInput(value);
     fetchData(value);
   };

   return (
     <div className="input-wrapper">
       <FaSearch id="search-icon" />
       <input className="input-type-search"
         placeholder="Type to search..."
         value={input}
         onChange={(e) => handleChange(e.target.value)}
       />
     </div>
   );
 };

 export default Search; 