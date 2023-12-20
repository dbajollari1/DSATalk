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

    
    const RootContainer = styled('div')({
        padding: (theme) => theme.spacing(3),
    });

    const DiscussionContainer = styled('div')({
        marginBottom: (theme) => theme.spacing(3),
        padding: (theme) => theme.spacing(2),
        border: '1px solid #ddd',
        borderRadius: (theme) => theme.spacing(1),
    });

    const CommentContainer = styled('div')({
        margin: (theme) => theme.spacing(2, 0),
        padding: (theme) => theme.spacing(2),
        border: '1px solid #eee',
        borderRadius: (theme) => theme.spacing(1),
    });

    const ReplyContainer = styled('div')({
        marginLeft: (theme) => theme.spacing(4),
        marginBottom: (theme) => theme.spacing(2),
        padding: (theme) => theme.spacing(2),
        border: '1px solid #f0f0f0',
        borderRadius: (theme) => theme.spacing(1),
    });

    const AddCommentButton = styled('div')({
        margin: (theme) => theme.spacing(2, 0),
    });

    


    return (
        <div className={RootContainer}>
            <div className={DiscussionContainer}>
                <h1>{discussion.title}</h1>
                <h3>Posted By {discussion.user?.username}</h3> 
                <p>{discussion.content}</p>
                {discussion.image ? <img src={discussion.image} alt="discussion image" /> : null}
                <h3>Likes: {discussion.likes?.length}</h3>
                <Button onClick={() => handleLike(discussion._id)} variant="outlined" className="AddCommentButton">Like</Button>
                {curUser && curUser.data._id === discussion.user._id && (
                    <div className="delete-button">
                    <br></br>
                    <button onClick={() => handleDeleteDiscussion(discussion._id)} >
                    Delete Discussion
                    </button>
                    </div>
                )}
            </div>
                <div>
                    <Typography variant="h5">Comments</Typography>
                    <Button onClick={() => setShowAddCommentForm(!showAddCommentForm)} variant='outlined' className="AddCommentButton">Add Comment</Button>
                    {showAddCommentForm && (
                        <AddCommentAndReply
                            open={showAddCommentForm}
                            closeAddCommentForm={closeAddCommentForm}
                            Id={discussion._id}
                            handleClose={() => setShowAddCommentForm(!showAddCommentForm)}
                        />
                    )}
                    {discussion.comments?.map((comment) => (
                        <Card key={comment._id} className="CommentContainer">
                            <h4>Commented By {comment.authorUsername}</h4>
                            <p>{comment.content}</p>
                            {comment.replies?.map((reply) => (
                                <Card key={reply._id} className="ReplyContainer">
                                    <h5> Reply By {reply.authorUsername}</h5>
                                    <p>{reply.content}</p>
                                </Card>
                            ))}
                            <Button onClick={() => toggleAddReplyForm(comment._id)} variant="outlined" >Add Reply</Button>
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
                        </Card>
                    ))}
                </div>
        </div>
    )
}

export default Discussion;