import { useRouteError } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <Container maxWidth="md">
        <Typography component='h1' variant='h2'>{title}</Typography>
        <Typography component='p' variant='body2'>{message}</Typography>
      </Container>
    </>
  );
}

export default ErrorPage;