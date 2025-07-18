import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MovieItem from "../components/MovieItem";
import classes from './MoviesList.module.css';

const DUMMY_MOVIES = [
  {
    id: 'm1',
    title: 'Inception',
    releaseYear: 2010,
    genre: 'Sci-Fi',
    description: 'A mind-bending thriller by Christopher Nolan.',
  },
  {
    id: 'm2',
    title: 'The Matrix',
    releaseYear: 1999,
    genre: 'Sci-Fi',
    description: 'A sci-fi classic that questions reality.',
  },
  {
    id: 'm3',
    title: 'Interstellar',
    releaseYear: 2014,
    genre: 'Sci-Fi',
    description: 'A space epic that explores love and time.',
  },
  {
    id: 'm4',
    title: 'The Shawshank Redemption',
    releaseYear: 1994,
    genre: 'Drama',
    description: 'A story of hope and friendship in prison.',
  },
  {
    id: 'm5',
    title: 'The Godfather',
    releaseYear: 1972,
    genre: 'Crime',
    description: 'A classic crime drama about family and power.',
  }
];


function MoviesList({ movies }) {
  return (
    <Container maxWidth="lg">
      <Typography component='h2' variant='h3' marginBottom={3}>Favorite movies</Typography>
      <Grid container spacing={5}>
        <MovieItem movieData={DUMMY_MOVIES[0]} buttonAction='delete'/>
        <MovieItem movieData={DUMMY_MOVIES[3]} buttonAction='delete'/>
      </Grid>
      <Box className={`container ${classes.listTitle}`} marginTop={7} marginBottom={3}>
        <Typography component='h2' variant='h3'>All movies</Typography>
        <button className={classes.newButton}><Link to='new'>Add new</Link></button>
      </Box>
      <Grid container spacing={5}>
        {movies.map(movie => (<MovieItem key={movie.id} movieData={movie} buttonAction='add'/>))}
      </Grid>
    </Container>
  );
}

export default MoviesList;