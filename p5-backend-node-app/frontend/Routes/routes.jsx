import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Poultry from '../pages/Poultry/Poultry.jsx';
import AddPoultry from '../pages/Poultry/AddPoultry.jsx';
import Inventory from '../pages/Inventory/Inventory.jsx';
import AddInventory from '../pages/Inventory/AddInventory.jsx';
import Finance from '../pages/Finance/Finance.jsx';
import AddFinance from '../pages/Finance/AddFinance.jsx';
import Production from '../pages/Production/Production.jsx';
import AddProduction from '../pages/Production/AddProduction.jsx';
import Login from '../pages/Auth/Login.jsx';
import Register from '../pages/Auth/Register.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'poultry', element: <Poultry /> },
      { path: 'poultry/add', element: <AddPoultry /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'inventory/add', element: <AddInventory /> },
      { path: 'finance', element: <Finance /> },
      { path: 'finance/add', element: <AddFinance /> },
      { path: 'production', element: <Production /> },
      { path: 'production/add', element: <AddProduction /> }
    ],
  },
]);