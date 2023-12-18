import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddComment from './AddComment'; 


function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const [curUser, setCurUser] = useState('');
    const {currentUser} = useContext(AuthContext);
    const [showAddReplForm, setShowAddReplyForm] = useState(false);
    const [showAddCommentForm, setShowAddCommentForm] = useState(false);
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        const fetchDiscussion = async () => {
            try{
            console.log(currentUser.accessToken)
            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            };
            const res = await axios.get(`http://localhost:3000/discussions/discussion/${id}`, {headers});
            setDiscussion(res.data);
            console.log("here")
            const curUser = await axios.get(`http://localhost:3000/users/email/${currentUser.email}`,{headers})
            setCurUser(curUser)
        }
        catch(e){
            console.log(e)
        }};
        fetchDiscussion();

    }, []);

    const handleLike = async (id) => {
       try{
        const headers = {
            'Authorization': `Bearer ${currentUser.accessToken}`, 
            'Content-Type': 'application/json',
        };
       
        const res = await axios.post(`http://localhost:3000/discussions/${id}/likes`, {}, { headers });
        console.log(res)
        setDiscussion(res.data);
        // const response = await axios.get('http://localhost:3000/discussions', { headers });
        // setDiscussion(response.data);

       }
         catch(e){
              console.log(e)
         }
    }

    const handleDeleteDiscussion = async (discussionId) => {
        try {
            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            }
            const res = await axios.delete(`http://localhost:3000/discussions/${discussionId}`, { headers });
            alert('Discussion deleted successfully!');
            const response = await axios.get('http://localhost:3000/discussions', { headers });
            setDiscussion(response.data);
            history('/discussions');


        }
        catch (error) {
            console.error('Error deleting discussion', error);
        }
    }

    const handleAddComment = async (discussionId) => {

        try {

            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            }
            const res = await axios.post(`http://localhost:3000/discussions/${discussionId}/comments`, { headers });
            alert('Comment added successfully!');
            const response = await axios.get('http://localhost:3000/discussions', { headers });
            setDiscussion(response.data);
        }
        catch (error) {
            console.error('Error adding comment', error);
        }
    }

    const handleAddReply = async (discussionId, CommentId) => {

        try {

            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            }
            const res = await axios.post(`http://localhost:3000/discussions/${discussionId}/comments/${CommentId}/replies`, { headers });
            alert('Reply added successfully!');
            const response = await axios.get('http://localhost:3000/discussions', { headers });
            setDiscussion(response.data);
        }
        catch (error) {
            console.error('Error adding reply', error);
        }
    }

    

    const closeAddReplyForm = () => {
        setShowAddReplyForm(false);
    }

    const closeAddCommentForm = () => {
        setShowAddCommentForm(false);
    }


    return (
        <div>
                <h1>{discussion.title}</h1>
                <h3>Posted By {discussion.user?.username}</h3> 
                <p>{discussion.content}</p>
                {discussion.image ? <img src={discussion.image} alt="discussion image" /> : null}
                <h3>Likes: {discussion.likes?.length}</h3>
                <button onClick={() => handleLike(discussion._id)}>Like</button>
                {curUser && curUser.data._id === discussion.user._id && (
                    <div className="delete-button">
                    <br></br>
                    <button onClick={() => handleDeleteDiscussion(discussion._id)} >
                    Delete Discussion
                    </button>
                    </div>
                )}
                <div>
                    <h3>Comments</h3>
                    <button onClick={() => setShowAddCommentForm(!showAddCommentForm)}>Add Comment</button>
                    {showAddCommentForm && (
                        <AddComment
                            open={showAddCommentForm}
                            closeAddCommentForm={closeAddCommentForm}
                            Id={discussion._id}
                            handleClose={() => setShowAddCommentForm(!showAddCommentForm)}
                        />
                    )}
                    {discussion.comments?.map((comment) => (
                        <div key={comment._id}>
                            <h4>{comment.authorUsername}</h4>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Discussion;