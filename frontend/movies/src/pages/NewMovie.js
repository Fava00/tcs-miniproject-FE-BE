import Container from '@mui/material/Container';

import MovieForm from '../components/MovieForm';

function NewMoviePage() {
  return (
    <Container maxWidth="lg">
      <MovieForm method='post' />
    </Container>
  );
}

export default NewMoviePage;