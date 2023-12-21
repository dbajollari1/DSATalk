import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../context/AuthContext';
import SocialSignIn from './SocialSignIn';
import { Card, CardContent, TextField, Button, Typography, FormHelperText } from '@mui/material';

function SignUp() {
  const {currentUser,displayName,  setDisplayName} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [pwMatch, setPwMatch] = useState('');
     const handleSignUp = async (e) => {
    e.preventDefault();
    const {email, passwordOne, passwordTwo} = e.target.elements;
    setError(''); 
    setPwMatch('');
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }
    try {
      await doCreateUserWithEmailAndPassword(
        email.value.toLowerCase(),
        passwordOne.value,
        displayName
      );
    } catch (error) {
      setError('An error occurred during sign up. Please try again.');
    }
  };

   if (currentUser) {
    return <Navigate to='/' />;
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <Card style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSignUp}>
            <TextField
              required
              autoFocus
              name='displayName'
              label='Name'
              type='text'
              placeholder='Name'
              fullWidth
              margin='normal'
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
            <TextField
              required
              name='email'
              label='Email'
              type='email'
              placeholder='Email'
              fullWidth
              margin='normal'
            />
            <TextField
              required
              id='passwordOne'
              name='passwordOne'
              label='Password'
              type='password'
              placeholder='Password'
              autoComplete='off'
              fullWidth
              margin='normal'
            />
            <TextField
              required
              name='passwordTwo'
              label='Confirm Password'
              type='password'
              placeholder='Confirm Password'
              autoComplete='off'
              fullWidth
              margin='normal'
            />
            {pwMatch && <FormHelperText error style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1rem'}}>{pwMatch}</FormHelperText>}
            {error && <FormHelperText error style={{ textAlign: 'center', fontSize: '1rem' }}>{error}</FormHelperText>}
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              style={{ backgroundColor: 'rgb(5, 30, 52)', 
              color: 'white',
              '&:hover': {
              backgroundColor: 'rgba(5, 30, 52, 0.8)', 
            },marginTop: '1rem' }}
            >
              Sign Up
            </Button>
          </form>
          <br/>
          <SocialSignIn />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;