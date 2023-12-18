import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem
  } from "@mui/material";

function AddCommentAndReply({ open, handleClose, closeAddCommentForm, Id, reply, commentId, closeAddReplyForm }) {
    const { currentUser } = useContext(AuthContext);
    const [discussionDetails, setDiscussionDetails] = useState({
        content: '',
    });

    const checkContent = (content) => {
        if (!content){
         alert (`Error: You must supply content!`)
        return
        }
        if (typeof content !== 'string'){
        
          alert(`Error: content must be a string!`);
          return
        }
        content = content.trim();
        if (content.length === 0){
          alert(`Error: content cannot be an empty string or string with just spaces`);
          return 
        }
        if (!isNaN(content))
        {
          alert(`Error: this is not a valid value for content it only contains digits`);
          return
        }
        if (content.length < 50){
           alert(`Error: content length must be greater than or equal to 50 characters`);
           return
          }
        return content
      }

    const handleValueChange = (e) => {
        setDiscussionDetails({ ...discussionDetails, [e.target.name]: e.target.value });
      };

    const onSubmitDiscussion = async (e) => {
        e.preventDefault();
        const headers = {
          'Authorization': `Bearer ${currentUser.accessToken}`, 
          'Content-Type': 'application/json',
        }
        const content = checkContent(discussionDetails.content);
        const user = await axios.get(`http://localhost:3000/users/email/${currentUser.email}`, { headers });
        if (!content){
          return
        }
        const newDiscussion = {
            content: content,
            userId: user.data._id,
            username: user.data.username,
            
            
        };
        const formData = new FormData();
        formData.append('json_data',JSON.stringify(newDiscussion))
        try {
            const res = await axios.post(`http://localhost:3000/comments/${Id}`, formData , { headers });
            console.log(res)
            alert('Comment added successfully!');
        }

        catch (error) {
            console.error('Error adding discussion', error);
        }
        handleClose();
        closeAddCommentForm();
        window.location.reload();
    }

    const handleCancel = () => {
        handleClose();
    }

    const onSubmitReply = async (e) => {
        e.preventDefault();

        const headers = {
          'Authorization': `Bearer ${currentUser.accessToken}`, 
          'Content-Type': 'application/json',
        }
        const content = checkContent(discussionDetails.content);
        const user = await axios.get(`http://localhost:3000/users/email/${currentUser.email}`, { headers });
        if (!content){
          return
        }
        const newDiscussion = {
            content: content,
            userId: user.data._id,
            username: user.data.username,
            
            
        };
        const formData = new FormData();
        formData.append('json_data',JSON.stringify(newDiscussion))
        try {
            const res = await axios.post(`http://localhost:3000/comments/${Id}/${commentId}/reply`, formData , { headers });
            console.log(res)
            alert('Reply added successfully!');
        }

        catch (error) {
            console.error('Error adding discussion', error);
        }
        handleClose();
        closeAddReplyForm();
        window.location.reload();
    }


    

    return (
    
      <>
    {reply 
      ? 
      
      <Dialog open={open} onClose={handleClose} maxWidth="sx">
      <DialogTitle>Add New Reply</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Content:"
          variant="outlined"
          name="content"
          onChange={handleValueChange}
          value={discussionDetails.content}
        />
        <br/> 
        </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={onSubmitReply}>Add Reply</Button>
      </DialogActions>
    </Dialog>
      

      : 

    <Dialog open={open} onClose={handleClose} maxWidth="sx">
      <DialogTitle>Add New Comment</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Content:"
          variant="outlined"
          name="content"
          onChange={handleValueChange}
          value={discussionDetails.content}
        />
        <br/> 
        </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={onSubmitDiscussion}>Add Comment</Button>
      </DialogActions>
    </Dialog>}

    </>
    );
}

export default AddCommentAndReply;