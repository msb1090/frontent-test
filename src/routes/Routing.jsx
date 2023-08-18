import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ApplicationPage from '@/pages/ApplicationPage';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Login />,
  },
  {
    path: '/register/*',
    element: <Register />,
  },
  {
    path: '/login/*',
    element: <Login />,
  },
  {
    path: '/applications/*',
    element: <ApplicationPage />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
