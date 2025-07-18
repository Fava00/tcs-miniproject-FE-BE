import {
  Form,
  useNavigate,
  //useActionData,
  redirect
} from 'react-router-dom';

import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import classes from './MovieForm.module.css';
import Grid from '@mui/material/Grid';

function MovieForm({ method, movie }) {
  //const data = useActionData();
  const navigate = useNavigate();

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {/*data && data.errors && (
        <ul className={classes.errorList}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )*/}
      <Box marginY={2}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={movie ? movie.title : ''}
        />
      </Box>
      <Box marginY={2}>
        <label htmlFor="releaseYear">Year of release</label>
        <input
          id="releaseYear"
          type="number"
          name="releaseYear"
          required
          defaultValue={movie ? movie.releaseYear : ''}
        />
      </Box>
      <Box marginY={2}>
        <label htmlFor="director">Director</label>
        <input
          id="director"
          type="text"
          name="director"
          required
          defaultValue={movie ? movie.director : ''}
        />
      </Box>
      <Box>
        <label htmlFor="genres">Genres</label>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid size={4}>
              <FormControlLabel control={<Checkbox />} label='Action' value='ACTION' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Comedy' value='DRAMA' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Drama' value='DRAMA' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Horror' value='HORROR' name='genres'/>
            </Grid>
            <Grid size={4}>
              <FormControlLabel control={<Checkbox />} label='Romance' value='ROMANCE' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Thriller' value='THRILLER' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Adventure' value='ADVENTURE' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Fantasy' value='FANTASY' name='genres'/>
            </Grid>
            <Grid size={4}>
              <FormControlLabel control={<Checkbox />} label='Documentary' value='DOCUMENTARY' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Crime' value='CRIME' name='genres'/>            
              <FormControlLabel control={<Checkbox />} label='Animation' value='ANIMATION' name='genres'/>
              <FormControlLabel control={<Checkbox />} label='Sci-Fi' value='SCIENCE FICTION' name='genres'/>
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
      <Box marginY={2}>
        <label htmlFor="posterURL">Poster</label>
        <input
          id="posterURL"
          type="url"
          name="posterURL"
          required
          defaultValue={movie ? movie.posterURL : ''}
        />
      </Box>
      <Box marginY={2}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={movie ? movie.description : ''}
        />
      </Box>
      <Box marginTop={4} className={`container ${classes.actions}`}>
        <button type="button" onClick={cancelHandler} className={classes.cancelButton}>Cancel</button>
        <button className={classes.saveButton}>Save</button>
      </Box>
    </Form>
  );
}

export default MovieForm;

// defaultChecked={movie ? movie.genres.any('ACTION') : false}


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const movieData = {
    title: data.get('title'),
    releaseYear: data.get('releaseYear'),
    director: data.get('director'),
    genres: data.get('genres'),
    posterURL: data.get('posterURL'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/movies';

  if (method === 'PATCH') {
    const movieId = params.movieId;
    url = 'http://localhost:8080/movies/' + movieId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });

  // if (response.status === 422) {
  //   return response;
  // }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save movie.' }), {
      status: 500,
    });
  }

  return redirect('/movies');
}