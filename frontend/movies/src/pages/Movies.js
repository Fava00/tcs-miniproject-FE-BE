import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import MoviesList from '../components/MoviesList';

function MoviesPage() {
  const movies = useLoaderData();

  console.log(movies);
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={movies}>
        {<MoviesList movies={movies} />}
      </Await>
    </Suspense>
  );
}

export default MoviesPage;


export async function loader() {
  const response = await fetch('http://localhost:8080/api/custom-movies', { method: 'get' });
  // console.log(response);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch movies.' }), {
      status: 500,
    });
  } else {
    return response;
  }
}
