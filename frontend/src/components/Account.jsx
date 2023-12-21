import React,{useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { Card, CardContent, Typography, TextField  } from '@mui/material';

function Account() {
  const { currentUser } = useContext(AuthContext);

  // Assuming currentUser has these fields
  const userDetails = {
    displayName: currentUser.displayName || 'N/A',
    email: currentUser.email || 'N/A',
    // Add other fields you want to display
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <Card style={{ padding: '2rem', maxWidth: '500px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Account Details
          </Typography>
          <form>
            <TextField
              label="Name"
              value={userDetails.displayName}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: '#f5f5f5', // Light grey background
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
            />
            <TextField
              label="Email"
              value={userDetails.email}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: '#f5f5f5', // Light grey background
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
            />
            <br/>
            <br/>
            {/* Add other user detail fields here */}
          </form>
          <ChangePassword />
          <br/>
          <SignOutButton />
        </CardContent>
      </Card>
    </div>
   
  );
}

export default Account;