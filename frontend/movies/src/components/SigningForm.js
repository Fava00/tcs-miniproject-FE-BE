import { useRef } from 'react';
import { Form, redirect } from 'react-router-dom';

import Box from "@mui/material/Box";

import classes from './SigningForm.module.css';

function SigningForm() {
  const username = useRef();
  const password = useRef();

  return (
    <>
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
        <button className={classes.signingButton}>Submit</button>
      </Form>
    </>
  );
}

export default SigningForm;


export async function action({ request }) {
  const data = await request.formData();

  const userData = {
    usernamer: data.get('username'),
    password: data.get('password'),
  };

  let url = 'http://localhost:8080/signin';

  if (request.url.includes('signup')) {
    userData.isSignup = true;
    url = 'http://localhost:8080/register';
  }

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save movie.' }), {
      status: 500,
    });
  }

  return redirect('/profile');
}