import { Link, /*useParams,*/ useSubmit } from "react-router-dom";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import classes from '../styles/MovieDetails.module.css';
import testImg from '../assets/test_poster.jpg';

const DUMMY_MOVIE = {
  id: 'm1',
  title: 'Inception',
  releaseYear: 2010,
  director: 'Christopher Nolan',
  genre: 'Sci-Fi',
  description: 'A mind-bending thriller by Christopher Nolan.',
}

function MovieDetails() {
  // const { movieId } = useParams();
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <Container maxWidth="md" className={`container ${classes.detailsContainer}`}>
      <Box className={classes.detailsBox}>
        {/* {movieId && <p>Details for movie ID: {movieId}</p>} */}
        <Typography component='h1' variant="h2" fontWeight={400} marginBottom={2}>
          {DUMMY_MOVIE.title}
        </Typography>
        <Typography component='p' variant="h5">
          Released in: {DUMMY_MOVIE.releaseYear}
        </Typography>
        <Typography component='p' variant="h5">
          Genre: {DUMMY_MOVIE.genre}
        </Typography>
        <Typography component='p' variant="h5">
          Director: {DUMMY_MOVIE.director}
        </Typography>
        <Typography component='p' variant="body1" marginTop={1}>
          {DUMMY_MOVIE.description}
        </Typography>
        <Box className={classes.buttonMenu} marginTop={3}>
          <button className={classes.editButton}>
            <Link to="edit" className={classes.linkStyle}>Edit</Link>
          </button>
          <button className={classes.deleteButton} onClick={startDeleteHandler}>Delete</button>
        </Box>
      </Box>
      <img
        src={testImg}
        alt={DUMMY_MOVIE.title}
        className={classes.image} />
    </Container>
  );
}

export default MovieDetails;