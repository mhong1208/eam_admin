import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
// import { lazy } from 'react';
import NotFound from '@/pages/Error/NotFound';
import Forbidden from '@/pages/Error/Forbidden';

// const Inventory = lazy(() => import('@/pages/Inventory'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'settings',
        element: <div>Trang cài đặt</div>,
      },
      // {
      //   path: 'inventory',
      //   element: <Inventory />,
      // },
      { path: '403', element: <Forbidden /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
