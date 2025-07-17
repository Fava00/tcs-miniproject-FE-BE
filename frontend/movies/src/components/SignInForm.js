import { useRef } from 'react';
import { Form } from 'react-router-dom';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import classes from './SignInForm.module.css';

function SignInPage() {
  
    const username = useRef();
    const password = useRef();

    function handleClick(event) {
      event.preventDefault();

      // const enteredUsername = username.current.value;
      // const enteredPassword = password.current.value;
    }

  return (
    <Container maxWidth="sm">
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
        <button className={classes.signInButton} onClick={handleClick}>Sign In</button>
      </Form>
    </Container>
  );
}

export default SignInPage;