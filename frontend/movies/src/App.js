import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/RootLayout.js';
//import EditEventPage from './pages/EditEvent';
//import ErrorPage from './pages/Error';
//import EventDetailPage, {
//  loader as eventDetailLoader,
//  action as deleteEventAction,
//} from './pages/EventDetail';
//import EventsPage, { loader as eventsLoader } from './pages/Events';
//import EventsRootLayout from './pages/EventsRoot';
//import HomePage from './pages/Home';
//import NewEventPage from './pages/NewEvent';
//import { action as manipulateEventAction } from './components/EventForm';
//import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    //errorElement: <ErrorPage />,
    children: [
      //{ index: true, element: <HomePage /> },
      {
        path: 'movies',
        //element: <EventsRootLayout />,
        children: [
          {
            index: true,
            //loader: eventsLoader,
            //element: <EventsPage />,
          }]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;