import { Link, /*useParams,*/ useSubmit, useRouteLoaderData, redirect } from "react-router-dom";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import classes from '../styles/MovieDetails.module.css';
import testImg from '../assets/test_poster.jpg';

// export const DUMMY_MOVIE = {
//   id: 'm1',
//   title: 'Inception',
//   releaseYear: 2010,
//   director: 'Christopher Nolan',
//   genre: 'Sci-Fi',
//   description: 'A mind-bending thriller by Christopher Nolan.',
// }

function MovieDetails() {
  const movie = useRouteLoaderData('movie-details');
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
          {movie.title}
        </Typography>
        <Typography component='p' variant="h5">
          Released in: {movie.releaseYear}
        </Typography>
        <Typography component='p' variant="h5">
          Genre: {movie.genre}
        </Typography>
        <Typography component='p' variant="h5">
          Director: {movie.director}
        </Typography>
        <Typography component='p' variant="body1" marginTop={1}>
          {movie.description}
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
        alt={movie.title}
        className={classes.image} />
    </Container>
  );
}

export default MovieDetails;


export async function loader({ params }) {
  const movieId = params.movieId;

  const id = movieId.slice(-2);

  const response = await fetch('http://localhost:8080/api/custom-movies/' + id, {method: 'get'});

  console.log(response);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected movie.' }), {
      status: 500,
    });
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const movieId = params.movieId;

  const id = movieId.slice(-2);

  const response = await fetch('http://localhost:8080/api/custom-movies/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: `Could not delete movie.` }), {
      status: 500,
    });
  }
  return redirect('/movies');
}