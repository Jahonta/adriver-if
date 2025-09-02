import type { ReactElement } from 'react'
import { Navigate } from 'react-router'

import type { TUserRole } from '../../types/user-role'
import type { TAppRoute } from '../../types/app-route'

import { useAppSelector } from '../../hooks/use-app-selector'
import { getUserRole } from '../../store/user/selectors'

type ProtectedRouteProps = {
  availableFor: TUserRole;
  redirectTo: TAppRoute;
  children: ReactElement;
}

const ProtectedRoute = ({
  availableFor,
  redirectTo,
  children,
}: ProtectedRouteProps) => {
  const userRole = useAppSelector(getUserRole)

  return availableFor === userRole ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  )
}

export default ProtectedRoute
