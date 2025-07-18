// import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MoviesList from './components/MoviesList';
//import MoviesPage, { loader as moviesLoader } from './pages/Movies';
import NewMoviePage from './pages/NewMovie';
import MovieDetailsPage/*, { loader movieDetailsLoader, action as deleteMovieAction }*/ from './pages/MovieDetails';
import EditMoviePage from './pages/EditMovie';
// import { action as modifyMovieAction } from './components/MovieForm';
import ProfilePage/*, { loader as profileLoader }*/ from './pages/Profile';
import SignInPage/*, { action as signInAction }*/ from './pages/SignIn';
import SignUpPage/*, { action as signUpAction }*/ from './pages/SignUp';

import './App.css';
//import EditEventPage from './pages/EditEvent';
//import EventDetailPage, {
//  loader as eventDetailLoader,
//  action as deleteEventAction,
//} from './pages/EventDetail';
//import EventsPage, { loader as eventsLoader } from './pages/Events';
//import EventsRootLayout from './pages/EventsRoot';
//import NewEventPage from './pages/NewEvent';
//import { action as manipulateEventAction } from './components/EventForm';
//import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';


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
          { index: true, element: <MoviesList />, /*element: <MoviesPage />, loader: moviesLoader*/},
          { path: 'new', element: <NewMoviePage />, /*action: modifyMovieAction*/},
          {
            path: ':movieId',
            id: 'movie-details',
            // loader: movieDetailsLoader,
            children: [
              { index: true, element: <MovieDetailsPage />, /*action: deleteMovieAction*/},
              { path: 'edit', element: <EditMoviePage />, /*action: modifyMovieAction*/}
            ]
          }
        ]
      },
      {
        path: 'profile',
        children: [
          { index: true, element: <ProfilePage />, /*loader: profileLoader,*/ /*action: logOutAction,*/ },
          { path: 'signin', element: <SignInPage />, /*action: signInAction,*/ },
          { path: 'signup', element: <SignUpPage />, /*action: signUpAction,*/ }
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;