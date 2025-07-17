import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import MoviesList from '../components/MoviesList';

function MoviesPage() {

  const { movies } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={movies}>
        {( /*loadedMovies*/ ) => <MoviesList /*movies={loadedMovies}*/ />}
      </Await>
    </Suspense>
  );
}

export default MoviesPage;

/*
export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    return response;
  }
}*/