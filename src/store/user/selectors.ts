import { createSelector } from '@reduxjs/toolkit'

import { StoreNameSpace, UserRole } from '../../constants'

import type { TState } from '../../types/state'

import type { UserState } from './state'

export const getIsAdmin = createSelector(
  (state: TState) => state[StoreNameSpace.User],
  (state: UserState) => state.role === UserRole.Admin
)

export const getUserRole = createSelector(
  (state: TState) => state[StoreNameSpace.User],
  (state: UserState) => state.role
)

export const getIsLoggedIn = createSelector(
  (state: TState) => state[StoreNameSpace.User],
  (state: UserState) => state.role !== UserRole.Guest
)

export const getUserEmail = createSelector(
  (state: TState) => state[StoreNameSpace.User],
  (state: UserState) => state.user
)
