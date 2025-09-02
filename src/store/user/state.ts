import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { TUser } from '../../types/user'

import { UserRole, StoreNameSpace } from '../../constants'

export type UserState = {
  user: TUser['login'] | null;
  role: TUser['role'] | null;
}

const initialState: UserState = {
  user: null,
  role: UserRole.Guest
}

export const userSlice = createSlice(
  {
    initialState,
    name: StoreNameSpace.User,
    reducers: {
      login(state, { payload }: PayloadAction<UserState>) {
        state.user = payload.user
        state.role = payload.role
      },
      logout(state) {
        state.user = null
        state.role = UserRole.Guest
      }
    }
  }
)

export const { login, logout } = userSlice.actions

