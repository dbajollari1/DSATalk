import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Leaderboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${currentUser.accessToken}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(`http://localhost:3000/users/`, { headers });
        setAllUsers(response.data); 
      } catch (error) {
        console.error('Error fetching all users:', error);
        setError(true);
        setErrorCode(error.response ? error.response.status : 'unknown'); // Set the error code
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, [currentUser.accessToken]); 

  useEffect(() => {
    // Sort users based on the number of solved problems
    const sorted = allUsers.slice().sort((a, b) => b.problems.length - a.problems.length);
    setSortedUsers(sorted);
  }, [allUsers]);

  return (
    <div>
    {error?
    (  <Error errorCode={errorCode} message={errorMessage} />
    ):(<>
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Email</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.problems.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    )}
    </div>
  );
}

export default Leaderboard;
