import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {doChangePassword} from '../firebase/FirebaseFunctions';
import '../App.css';
import { Button, TextField, Typography, FormHelperText } from '@mui/material';

function ChangePassword() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const [error, setError] = useState(''); 
  console.log(currentUser);

  const submitForm = async (event) => {
    event.preventDefault();
    setError('');
    const {currentPassword, newPasswordOne, newPasswordTwo} =
      event.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPwMatch('New Passwords do not match, please try again');
      return false;
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value
      );
      alert('Password has been changed, you will now be logged out');
      
    } catch (error) {
      setError('Failed to change password. Please ensure your current password is correct.');
    }
  };

  if (currentUser.providerData[0].providerId === 'password') {
    return (
      <div>
        {pwMatch && <FormHelperText error>{pwMatch}</FormHelperText>}
        <Typography variant="h5" gutterBottom>
          Hi {currentUser.displayName}, Change Your Password Below
        </Typography>
        <form onSubmit={submitForm}>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            autoComplete="off"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="newPasswordOne"
            type="password"
            placeholder="Password"
            autoComplete="off"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            name="newPasswordTwo"
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            required
            fullWidth
            margin="normal"
          />
           {pwMatch && <FormHelperText error style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1rem'}}>{pwMatch}</FormHelperText>}
           {error && <FormHelperText error style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1rem'}} >{error}</FormHelperText>}
          <br/>
          <br/>
          <Button variant="contained" color="primary" type="submit" fullWidth style={{ backgroundColor: 'rgb(5, 30, 52)', 
              color: 'white',
              '&:hover': {
              backgroundColor: 'rgba(5, 30, 52, 0.8)', 
            },marginTop: '1rem' }}>
            Change Password
          </Button>
          
        </form>
      </div>
    );
  } else {
    return (
      <Typography variant="h6">
        {currentUser.displayName}, You are signed in using a Social Media Provider, You cannot change your password.
      </Typography>
    );
  }
}

export default ChangePassword;