import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import classes from '../styles/Home.module.css';

function HomePage() {
  return (
    <Container className={classes.containElement} maxWidth="lg">
      <Typography component='h1' variant='h2'>Welcome to MovieVerse!</Typography>
      <Typography component='h3' variant='h4'>Explore the latest movies and find your favorites!</Typography>
      <Typography component='p' variant='h5' className={classes.text}>
        This is MovieVerse, your go-to destination for everything cinema! Whether you are into edge-of-your-seat thrillers, heartfelt dramas, or laugh-out-loud comedies, there is something here for every kind of movie lover. Dive into the world of <span className={classes.italicText}>the art of imagination</span> and keep up with the latest releases. From timeless classics to hidden gems, we are here to help you <span className={classes.italicText}>discover your next favorite film</span>. Let the movie magic begin!
      </Typography>
    </Container>
  );
}

export default HomePage;