import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MoviesPage from './pages/Movies';
import ProfilePage from './pages/Profile';
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
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'movies',
        element: <MoviesPage />,
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