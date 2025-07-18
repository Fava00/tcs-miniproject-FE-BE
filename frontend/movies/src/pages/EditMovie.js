// import { useRouteLoaderData } from 'react-router-dom';
import Container from "@mui/material/Container";

import MovieForm from "../components/MovieForm";
import { DUMMY_MOVIE } from "./MovieDetails"; // Assuming you have a dummy movie data file

function EditMoviePage() {
  // const data = useRouteLoaderData('movie-details');

  return (
    <Container maxWidth="sm">
      <MovieForm method='patch' movie={DUMMY_MOVIE} /*movie={data.movie}*/ />
    </Container>
  );
}

export default EditMoviePage;