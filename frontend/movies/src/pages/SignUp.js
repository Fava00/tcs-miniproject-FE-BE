import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import SignUpForm from '../components/SigningForm';

function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <Typography component='h1' variant='h3'>Sign Up</Typography>
      <SignUpForm signAction='signup' />
    </Container>
  );
}

export default SignUpPage;