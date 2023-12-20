import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; // Import the CSS file
import AddDiscussionDialog from './AddDiscussionDialog';
import Error from './Error';

function DiscussionsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [discussions, setDiscussions] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const [curUser, setCurUser] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${currentUser.accessToken}`, 
          'Content-Type': 'application/json',
        };
        const curUser = await axios.get(`http://localhost:3000/users/email/${currentUser.email}`,{headers})
        setCurUser(curUser)
        const response = await axios.get('http://localhost:3000/discussions',{headers});
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error fetching discussion data', error);
        setError(true);
        setErrorCode(error.response ? error.response.status : 'unknown'); // Set the error code
        setErrorMessage(error.message);
      }
    };

    fetchDiscussions();
  }, []);

  const closeAddFormState = () => {
    setShowAddForm(false);
  };
  const handleDeleteDiscussion = async (discussionId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      const curDiscussion = await axios.delete(`http://localhost:3000/discussions/${discussionId}`, { headers });
      alert('Discussion deleted successfully!');
      const response = await axios.get('http://localhost:3000/discussions', { headers });
      setDiscussions(response.data);

      
    } catch (error) {
      console.error('Error deleting discussion', error);

    }
  };
  return (
    <div>
      {error ? (
       <Error errorCode={errorCode} message={errorMessage} />
      ): (
        <>
      <h1>Welcome to the Discussions page!</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>Create Discussion</button>
      <br/>
      <br/>
      {showAddForm && (
          <AddDiscussionDialog
            open={showAddForm}
            handleClose={() => setShowAddForm(!showAddForm)}
            closeAddFormState={closeAddFormState}
          />
        )}
      <div>
      {discussions.map((discussion) => (
  <div key={discussion._id} className="discussion-container">
    <div className="title-container">
      <h2 className="discussion-title">
        <a href={`/discussion/${discussion._id}`} className="discussion-link">
          {discussion.title}
        </a>
      </h2>
      <h3 className="author">By {discussion.user.username}</h3>
    </div>
    <span className="likes">Likes: {discussion.likes.length}</span>
    {curUser && curUser.data._id === discussion.user._id && (
    <div className="delete-button">
      <br></br>
    <button onClick={() => handleDeleteDiscussion(discussion._id)} >
      Delete Discussion
    </button>
    </div>
    ) }
    <textarea
      value={discussion.content}
      rows={5}
      cols={50}
      readOnly
      className="content-textarea"
    />
  </div>
))}

      </div>
      </>
     )}
    </div>
  );
}

export default DiscussionsPage;
