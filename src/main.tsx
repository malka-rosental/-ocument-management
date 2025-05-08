import './fonts.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import { LicenseInfo } from '@mui/x-license';

import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';

LicenseInfo.setLicenseKey('a80a238a22dcd29d74edb010814ef0d3Tz0xMTIxODMsRT0xNzc3NTkzNTk5MDAwLFM9cHJlbWl1bSxMTT1wZXJwZXR1YWwsUFY9aW5pdGlhbCxLVj0y');
// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
