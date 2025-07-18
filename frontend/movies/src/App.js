import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MoviesPage, { loader as moviesLoader } from './pages/Movies';
import { action as modifyFavoritesAction } from './components/MovieItem';
import NewMoviePage from './pages/NewMovie';
import { action as modifyMovieAction } from './components/MovieForm';
import MovieDetailsPage, { loader as movieDetailsLoader, action as deleteMovieAction } from './pages/MovieDetails';
import EditMoviePage from './pages/EditMovie';
import ProfilePage, { loader as profileLoader, action as logOutAction } from './pages/Profile';
import { action as signAction } from './components/SigningForm';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'movies',
        children: [
          { index: true, element: <MoviesPage />, loader: moviesLoader, action: modifyFavoritesAction},
          { path: 'new', element: <NewMoviePage />, action: modifyMovieAction},
          {
            path: ':movieId',
            id: 'movie-details',
            loader: movieDetailsLoader,
            children: [
              { index: true, element: <MovieDetailsPage />, action: deleteMovieAction},
              { path: 'edit', element: <EditMoviePage />, action: modifyMovieAction}
            ]
          }
        ]
      },
      {
        path: 'profile',
        children: [
          { index: true, element: <ProfilePage />, loader: profileLoader, action: logOutAction },
          { path: 'signin', element: <SignInPage />, action: signAction,},
          { path: 'signup', element: <SignUpPage />, action: signAction,}
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;