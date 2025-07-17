import { useRouteLoaderData } from 'react-router-dom';
import Container from "@mui/material/Container";

import MovieForm from "../components/MovieForm";

function EditMoviePage() {
  const data = useRouteLoaderData('event-detail');

  return (
    <Container maxWidth="lg">
      <MovieForm method='patch' event={data.event} />
    </Container>
  );
}

export default EditMoviePage;