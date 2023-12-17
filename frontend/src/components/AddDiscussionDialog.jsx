import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
//import SuccessDialog from './SuccessDialog';
import axios from 'axios';
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
  
const AddDiscussionDialog = ({ open, handleClose, closeAddFormState }) => {
  const { currentUser } = useContext(AuthContext);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [discussionDetails, setDiscussionDetails] = useState({
    title: '',
    content: '',
    tags: '',
    image: '',
    url: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDiscussionCompletion = (data) => {
    setSuccessDialogOpen(true);
    alert('Discussion Added');
    setDiscussionDetails({
      title: '',
      content: '',
      tags: '',
      image: '',
      url: '',
    });
  };

  const handleDiscussionError = (error) => {
    alert('Error Adding Discussion ' + error.message);
  };

  
  const checkString = (str, paramName) => {
    if (str === '' || str === null || str.trim().length === 0) {
      alert('Enter a valid value in ' + paramName);
      return false;
    }
    return true;
  };

  const onSubmitDiscussion = async () => {
    let validation = true;
    const emailId = currentUser.email;
    const headers = {
        'Authorization': `Bearer ${currentUser.accessToken}`, 
        'Content-Type': 'application/json',
      };
    const curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers})
    validation = validation && checkString(discussionDetails.title, 'Title');
    validation = validation && checkString(discussionDetails.content, 'Content');
    validation = validation && checkString(discussionDetails.tags, 'tags');
    validation = validation && checkString(discussionDetails.image, 'image');
    validation = validation && checkString(discussionDetails.url, 'url');

    // Add validation for other fields as needed
    
    if (!validation) {
      alert('Invalid Input');
      return;
    }


    const body = {
        title: discussionDetails.title,
        content: discussionDetails.content,
        tags: discussionDetails.tags,
        image: discussionDetails.image,
        url: discussionDetails.url,
        userId: curUser.data._id,
        username: curUser.data.username,
      };

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('json_data',JSON.stringify(body))
    try{
    const response = await axios.post('http://localhost:3000/discussions', formData,
      {
        headers:{
            'Authorization': `Bearer ${currentUser.accessToken}`, 
            'Content-Type': 'multipart/form-data'
        }
      }
      );
      console.log("Response ",response)
      if(response.status === 200){
        handleDiscussionCompletion(1)
      }
    }
      catch(e){
        handleDiscussionError(e)
      }
    handleClose();
    closeAddFormState();
    window.location.reload();

  };

  const handleCancel = () => {
    handleClose();
  };

  const handleValueChange = (event) => {
    setDiscussionDetails({ ...discussionDetails, [event.target.name]: event.target.value });
  };



 

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sx">
      <DialogTitle>Add New Discussion</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Title:"
          variant="outlined"
          name="title"
          onChange={handleValueChange}
          value={discussionDetails.title}
        />
        <br/> 
        
        <TextField
          id="outlined-basic"
          label="content:"
          variant="outlined"
          name="content"
          onChange={handleValueChange}
          value={discussionDetails.content}
        />

<br/> 
        
        <TextField
          id="outlined-basic"
          label="tags"
          variant="outlined"
          name="tags"
          onChange={handleValueChange}
          value={discussionDetails.tags}
        />

<br/> 
        
        <TextField
          id="outlined-basic"
          label="image:"
          variant="outlined"
          name="image"
          onChange={handleValueChange}
          value={discussionDetails.image}
        />
<br/> 
<input
          accept="image/*"
          
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />

        
        <TextField
          id="outlined-basic"
          label="url:"
          variant="outlined"
          name="url"
          onChange={handleValueChange}
          value={discussionDetails.url}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={onSubmitDiscussion}>Add Discussion</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiscussionDialog;
