import { Link } from 'react-router-dom';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SignInForm from '../components/SigningForm';
import classes from '../components/ProfileItem.module.css';

function SignInPage() {
  return (
    <Container maxWidth="sm">
      <Typography component='h1' variant='h3'>Sign In</Typography>
      <SignInForm signAction='signin' />
      <Box marginTop={30}>
        <Typography component='p' variant='h5'>Don't have an account?</Typography>
        <button className={classes.signButton}><Link to='/profile/signup'>Sign Up</Link></button>
      </Box>
    </Container>
  );
}

export default SignInPage;