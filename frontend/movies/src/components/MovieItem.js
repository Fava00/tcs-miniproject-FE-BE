import { Link, redirect, useSubmit } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import classes from './MovieItem.module.css';
import testImg from '../assets/test_poster.jpg';

function MovieItem({ movieData, buttonAction }) {
  const submit = useSubmit();

  function handleFavorites() {
    const data = (buttonAction === 'delete') ? null : { movieId: movieData.id };
    submit(data, { method: buttonAction });
  }

  return (
    <Grid size={6}>
      <Paper elevation={3} className={`container ${classes.paperStyle}`}>
        <Box className={`container ${classes.contentStyle}`}>
          <Typography component="h3" variant="h4" textAlign={'center'}>
            {movieData.title}
          </Typography>
          <Typography component="h4" variant="h5" textAlign={'center'}>
            ({movieData.releaseYear})
          </Typography>
          <Typography  component="h5" variant="h6">
            {movieData.genre}
          </Typography>
          <Typography component="p" variant="body2">
            {movieData.description}
          </Typography>
          <button className={classes.detailsButton}>
            <Link to={`/movies/:${movieData.id}`} className={classes.linkStyle}>View details</Link>
          </button>
          <button onClick={handleFavorites} className={classes.favoriteButton}>
            {(buttonAction === 'delete'? 'Delete from' : 'Add to')} favorites
          </button>
        </Box>
        <img
          src={testImg}
          alt={movieData.title}
          className={classes.image} />
      </Paper>
    </Grid>
  );
}

export default MovieItem;

export async function action({ request }) {
  const response = await fetch('http://localhost:8080/movies/favorites', { method: request.method });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: `Could not ${(request.method === 'DELETE') ? 'delete' : 'add'} movie.` }), {
      status: 500,
    });
  }

  return redirect('/movies');
}