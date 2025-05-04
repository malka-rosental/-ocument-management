import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { Layout } from 'src/layouts/simple';

import { LoadingScreen } from 'src/components/loading-screen';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/error/404'));

const IndexPage = lazy(() => import('src/pages/home'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const layout = () => (
  <Layout sx={{direction: 'rtl'}}>
    <SuspenseOutlet />
  </Layout>
);
export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: layout(),
    children: [
      { element: <IndexPage />, index: true },
    ],
  },

  // No match
  { path: '*', element: <Page404 /> },
];
