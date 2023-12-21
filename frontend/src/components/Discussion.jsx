import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCommentAndReply from './AddCommentAndReply'; 
import { styled } from '@mui/system';
import { Button, Typography, Card } from '@mui/material';




function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const [curUser, setCurUser] = useState('');
    const {currentUser} = useContext(AuthContext);
    const [showAddCommentForm, setShowAddCommentForm] = useState(false);
    const [showAddReplyForm, setShowAddReplyForm] = useState({});

    const toggleAddReplyForm = (commentId) => {
        setShowAddReplyForm((prevForms) => {
            const updatedForms = { ...prevForms };
    
            // Toggle the value for the specific commentId
            updatedForms[commentId] = !prevForms[commentId];
    
            return updatedForms;
        });
    };
    
    
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        const fetchDiscussion = async () => {
            try{
            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            };
            const res = await axios.get(`http://localhost:3000/discussions/discussion/${id}`, {headers});
            setDiscussion(res.data);
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
        const params = {
            userId: curUser.data._id,
        }
        const res = await axios.post(`http://localhost:3000/discussions/${id}/likes`, params, { headers });
        console.log(res)
        setDiscussion(res.data);
        const response = await axios.get('http://localhost:3000/discussions', { headers });
        setDiscussion(response.data);
        window.location.reload();
        

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
    
    const closeAddCommentForm = () => {
        setShowAddCommentForm(false);
    }

    

    const CommentContainer =  {
        marginBottom: '10px',
        padding: '10px',
        border: '2px solid #ddd',
        borderRadius: '5px',

    }
  
    const AddCommentButton = {
        margin: '10px',
        backgroundColor: 'white',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white',
        }
    }

    


    return (
        <div >
            <div >
                <h1>{discussion.title}</h1>
                <h3>Posted By {discussion.user?.username}</h3> 
                <p>{discussion.content}</p>
                {discussion.image ? <img src={discussion.image} alt="discussion image"  style={{ maxWidth: '500px', height: 'auto' }}/> : null}
                <h3>Likes: {discussion.likes?.length}</h3>
                <Button onClick={() => handleLike(discussion._id)} variant="outlined" style={AddCommentButton}>Like</Button>
                {curUser && curUser.data._id === discussion.user._id && (
                    <div style={AddCommentButton} >
                    <br></br>
                    <button onClick={() => handleDeleteDiscussion(discussion._id)} >
                    Delete Discussion
                    </button>
                    </div>
                )}
            </div>
                <div>
                    <h3 >Comments Below:</h3>
                    <Button onClick={() => setShowAddCommentForm(!showAddCommentForm)} variant='outlined' style={AddCommentButton} >Add Comment</Button>
                    {showAddCommentForm && (
                        <AddCommentAndReply
                            open={showAddCommentForm}
                            closeAddCommentForm={closeAddCommentForm}
                            Id={discussion._id}
                            handleClose={() => setShowAddCommentForm(!showAddCommentForm)}
                        />
                    )}
                    {discussion.comments?.map((comment) => (
                        <div key={comment._id} style={CommentContainer} >
                            <h4>Commented By {comment.authorUsername}</h4>
                            <p>{comment.content}</p>
                            {comment.replies?.map((reply) => (
                                <div key={reply._id} >
                                    <h5> Reply By {reply.authorUsername}</h5>
                                    <p>{reply.content}</p>
                                </div>
                            ))}
                            <Button onClick={() => toggleAddReplyForm(comment._id)} variant="outlined" style={AddCommentButton}>Add Reply</Button>
                            {showAddReplyForm[comment._id] && (
                                <AddCommentAndReply
                                    open={true} 
                                    closeAddReplyForm={() => toggleAddReplyForm(comment._id)}
                                    Id={discussion._id}
                                    commentId={comment._id}
                                    handleClose={() => toggleAddReplyForm(comment._id)}
                                    reply={true}
                                />
                            )}
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Discussion;