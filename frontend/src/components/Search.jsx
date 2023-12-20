import { useState, useContext } from "react";
 import { FaSearch } from "react-icons/fa";
 import { AuthContext } from "../context/AuthContext";
 import axios  from "axios";

 import "../App.css";

 const Search = ({ setResults,setDataResults }) => {
    const {currentUser} = useContext(AuthContext);
   const [input, setInput] = useState("");
    // console.log(currentUser.accessToken)
   const headers = {
     'Authorization': `Bearer ${currentUser.accessToken}`, 
     'Content-Type': 'application/json',
   }

 //   console.log(currentUser.accessToken)
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