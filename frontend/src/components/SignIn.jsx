import React, {useContext, useState} from 'react';
import SocialSignIn from './SocialSignIn';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';
import { Card, CardContent, TextField, Button, Typography, FormHelperText } from '@mui/material';


function SignIn() {
  const {currentUser} = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    let {email, password} = event.target.elements;
    setError(''); 
    const emailValue = email.value.toLowerCase();
    const passwordValue = password.value;

    try {
      await doSignInWithEmailAndPassword(emailValue, passwordValue);
    } catch (error) {
      setError('Failed to log in. Please check your email and password.');
    }
  };
  
  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value.toLowerCase();;
    if (email) {
      try {
        doPasswordReset(email);
        setError('Password reset email has been sent. Please check your inbox.');
      } catch (error) {
        setError('Failed to send password reset email. Please check the email provided.');
    } 
  }else {
      setError('Please enter an email address to reset your password.'); 
    }
  };
  if (currentUser) {
    return <Navigate to='/' />;
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
    <Card style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Log-In
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            name='email'
            id='email'
            type='email'
            label='Email Address'
            variant='outlined'
            margin='normal'
            fullWidth
            required
            autoFocus
            error={!!error} // Show error state if there is an error
          />
          <TextField
            name='password'
            type='password'
            label='Password'
            variant='outlined'
            margin='normal'
            fullWidth
            required
            error={!!error} // Show error state if there is an error
          />
          {error && <FormHelperText error>{error}</FormHelperText>} {/* Display error message */}
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={{ backgroundColor: 'rgb(5, 30, 52)', // Bluish-black color
            color: 'white', // White text color
            '&:hover': {
              backgroundColor: 'rgba(5, 30, 52, 0.8)', // Slightly lighter on hover
            },marginTop: '1rem' }}
          >
            Log in
          </Button>
          <Button
            color='secondary'
            fullWidth
            style={{ marginTop: '1rem' }}
            onClick={passwordReset}
          >
            Forgot Password
          </Button>
        </form>
        <SocialSignIn />
      </CardContent>
    </Card>
  </div>
);
}

export default SignIn;