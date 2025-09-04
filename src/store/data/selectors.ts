import { createSelector } from '@reduxjs/toolkit'

import { StoreNameSpace } from '../../constants'

import type { TState } from '../../types/state'

import type { DataState } from './state'

export const getEntities = createSelector(
  (state: TState) => state[StoreNameSpace.Data],
  (state: DataState) => state.entities
)

export const getSelected = createSelector(
  (state: TState) => state[StoreNameSpace.Data],
  (state: DataState) => state.selected
)

export const getIsSelected = createSelector(
  getSelected,
  (state: number[]) => (id: number) => state.includes(id)
)
