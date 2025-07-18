import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import classes from './ProfileItem.module.css';

function ProfileItem({ userData }) {
  function handleLogOut() {
    console.log('User logged out');
  }

  return (
    <Container maxWidth="sm">
      {userData.isSignedIn ? (
        <Box className={`container ${classes.profileBox}`}>
          <Typography component='h1' variant='h3' marginBottom={2}>Profile</Typography>
          <Typography component='p' variant='h5'>Username: {userData.username}</Typography>
          <Typography component='p' variant='h6' marginBottom={4}>Joined: {userData.joined}</Typography>
          <button onClick={handleLogOut}>Log out</button>
        </Box>
      ) : (
        <>
          <Box marginTop={15}>
            <Typography component='p' variant='h4'>Not signed in yet?</Typography>
            <button className={classes.signButton}><Link to='/profile/signin'>Sign In</Link></button>
          </Box>
          <Box marginTop={10}>
            <Typography component='p' variant='h4'>Don't have an account?</Typography>
            <button className={classes.signButton}><Link to='/profile/signup'>Sign Up</Link></button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default ProfileItem;