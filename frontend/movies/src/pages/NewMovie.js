import Container from '@mui/material/Container';

import MovieForm from '../components/MovieForm';

function NewMoviePage() {
  return (
    <Container maxWidth="sm">
      <MovieForm method='post' formAction='new'/>
    </Container>
  );
}

export default NewMoviePage;