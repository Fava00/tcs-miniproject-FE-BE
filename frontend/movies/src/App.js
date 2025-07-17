import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MoviesList from './components/MoviesList';
//import MoviesPage, { loader as moviesLoader } from './pages/Movies';
import NewMoviePage from './pages/NewMovie';
import MovieDetailsPage from './pages/MovieDetails';
import EditMoviePage from './pages/EditMovie';
import ProfilePage from './pages/Profile';



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
          { index: true, element: <MoviesList />, /*loader: moviesLoader*/},
          { path: 'new', element: <NewMoviePage />, },
          {
            path: ':movieId',
            children: [
              { index: true, element: <MovieDetailsPage />, },
              { path: 'edit', element: <EditMoviePage />, }
            ]
          }
        ]
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;