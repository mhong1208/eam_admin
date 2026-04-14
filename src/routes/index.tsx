import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard/index';
import Assets from '@/pages/Assets/index';
import Transfer from '@/pages/Transfer/index';
import Maintenance from '@/pages/Maintenance/index';
import InventoryAudit from '@/pages/InventoryAudit/index';
import AssetTypes from '@/pages/MasterData/AssetType/index';
import Locations from '@/pages/MasterData/Location/index';
import Suppliers from '@/pages/MasterData/Supplier/index';
import Employees from '@/pages/MasterData/Employee/index';
import Departments from '@/pages/MasterData/Department/index';
import NotFound from '@/pages/Error/NotFound/index';
import Forbidden from '@/pages/Error/Forbidden/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'assets',
        element: <Assets />,
      },
      {
        path: 'transfer',
        element: <Transfer />,
      },
      {
        path: 'maintenance',
        element: <Maintenance />,
      },
      {
        path: 'inventory-audit',
        element: <InventoryAudit />,
      },
      {
        path: 'master-data',
        children: [
          {
            path: 'asset-types',
            element: <AssetTypes />,
          },
          {
            path: 'locations',
            element: <Locations />,
          },
          {
            path: 'suppliers',
            element: <Suppliers />,
          },
          {
            path: 'employees',
            element: <Employees />,
          },
          {
            path: 'departments',
            element: <Departments />,
          },
        ],
      },
      {
        path: 'settings',
        element: <div>Trang cài đặt</div>,
      },
      { path: '403', element: <Forbidden /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
