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

  const checkTitle = (title) => {
    if (!title){ 
    alert(`Error: You must supply a title!`);
    return
    }
    if (typeof title !== 'string') {
    alert(`Error: title must be a string!`);
    return
    }
    title = title.trim();
    if (title.length === 0){
      alert(`Error: title cannot be an empty string or string with just spaces`);
      return
    }
    if (!isNaN(title)){
      alert(`Error: this is not a valid value for title it only contains digits`);
      return
    }
    if (title.length < 5){
      alert( `Error: title length must be greater than or equal to 5 characters`)
      return
    }
    return title
  }

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


  const isValidTagList = (input) => {
    // Split the input by commas
    const tags = input.split(',');
  
    // Check if each tag is a non-empty string
    return tags.every(tag => typeof tag === 'string' && (tag.trim() === '' || isNaN(tag.trim())));
  };
  const checkURL = (url) => {
    if (typeof url !== 'string') throw `Error: url must be a string!`;
    try {
      new URL(url);
      url = url.trim();
      return url
    } catch (err) {
      alert( "Error: invalid url!");
    }
  };


  const onSubmitDiscussion = async () => {
    let validation = true;
    const emailId = currentUser.email;
    const headers = {
        'Authorization': `Bearer ${currentUser.accessToken}`, 
        'Content-Type': 'application/json',
      };
    const curUser = await axios.get(`http://localhost:3000/users/email/${emailId}`,{headers})
     validation = validation && checkTitle(discussionDetails.title, 'Title');
     validation = validation && checkContent(discussionDetails.content, 'Content');
     if(!isValidTagList(discussionDetails.tags)){
      alert("Tags should be a comma separated list of alpha-numeric values")
      return;

     }
    validation = validation || discussionDetails.url && checkURL(discussionDetails.url, 'url');    
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
          label="Enter a comma-separated list of values"
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
