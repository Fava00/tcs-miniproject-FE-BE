import { useRouteLoaderData } from 'react-router-dom';
import Container from "@mui/material/Container";

import MovieForm from "../components/MovieForm";
// import { DUMMY_MOVIE } from "./MovieDetails";

function EditMoviePage() {
  const movie = useRouteLoaderData('movie-details');

  return (
    <Container maxWidth="sm">
      <MovieForm method='put' movie={movie} formAction='edit'/>
    </Container>
  );
}

export default EditMoviePage;