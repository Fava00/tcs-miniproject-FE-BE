import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import classes from './MovieItem.module.css';
import testImg from '../assets/test_poster.jpg';

function MovieItem({ movieData, favButtonText }) {

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
            <Link to={movieData.id} className={classes.linkStyle}>View details</Link>
          </button>
          <button className={classes.favoriteButton}>{favButtonText} favorites</button>
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