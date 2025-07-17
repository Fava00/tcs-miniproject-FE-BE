import { useState, useRef } from 'react';
import { Form } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import SignInForm from '../components/SignInForm';
import classes from '../styles/Profile.module.css';

const DUMMY_PROFILE = {
  username: 'testuser',
  joined: 2018
}

function ProfilePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const username = useRef();
  const password = useRef();

  function handleSignIn(event) {
    event.preventDefault();

    // const enteredUsername = username.current.value;
    // const enteredPassword = password.current.value;

    setIsSignedIn(true);
  }

  function handleLogOut() {
    setIsSignedIn(false);
  }
  
  return (
    <Container maxWidth="sm">
      {isSignedIn ? (
        <Box className={`container ${classes.profileBox}`}>
          <Typography component='h1' variant='h3' marginBottom={2}>Profile</Typography>
          <Typography component='p' variant='h5'>Username: {DUMMY_PROFILE.username}</Typography>
          <Typography component='p' variant='h6' marginBottom={4}>Joined: {DUMMY_PROFILE.joined}</Typography>
          <button onClick={handleLogOut}>Log out</button>
        </Box>) : <>
          <Typography component='h1' variant='h3'>Sign In</Typography>
          <Form method='post' className={classes.form}>
            <Box marginBottom={3}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                ref={username}
                required 
              />
            </Box>
            <Box marginBottom={6}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="text"
                name="password"
                ref={password}
                required 
              />
            </Box>
            <button className={classes.signInButton} onClick={handleSignIn}>Sign In</button>
          </Form>
        </> }
    </Container>
  );
}

export default ProfilePage;
