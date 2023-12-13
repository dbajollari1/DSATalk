import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; // Import the CSS file

function DiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/discussions');
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error fetching discussion data', error);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div>
      <h1>Welcome to the Discussions page!</h1>

      <div>
        {discussions.map((discussion) => (
          // Wrap the discussion content with a Link component
          <Link key={discussion._id} to={`/discussion/${discussion._id}`} className="discussion-link">
            <div className="discussion-container">
              <div className="title-container">
                <h2 className="discussion-title">{discussion.title}</h2>
                <h3 className="author">By {discussion.user.username}</h3>
              </div>
              <span className="likes">Likes: {discussion.likes.length}</span>
              <textarea
                value={discussion.content}
                rows={5}
                cols={50}
                readOnly
                className="content-textarea"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DiscussionsPage;
