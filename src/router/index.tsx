import { createBrowserRouter, Navigate } from 'react-router'
import { AppRoute, UserRole } from '../constants'

import ListPage from '../pages/ListPage'
import LoginPage from '../pages/LoginPage'
import NewEntityPage from '../pages/NewEntityPage'
import NotFoundPage from '../pages/NotFoundPage'

import ProtectedRoute from '../components/ProtectedRoute'
import Layout from '../components/Layout'

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => <Navigate to={AppRoute.List} />,
      },
      {
        path: AppRoute.List,
        Component: ListPage,
      },
      {
        path: AppRoute.Login,
        element: <ProtectedRoute availableFor={UserRole.Guest}
          redirectTo={AppRoute.Root}><LoginPage /></ProtectedRoute>,
      },
      {
        path: AppRoute.NewEntity,
        element: <ProtectedRoute availableFor={UserRole.Admin}
          redirectTo={AppRoute.Root}><NewEntityPage /></ProtectedRoute>,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
export default router
