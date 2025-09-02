import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { TEntity } from '../../types/entity'

import { StoreNameSpace } from '../../constants'

export type DataState = {
  entities: TEntity[];
}

const initialState: DataState = {
  entities: []
}

export const dataSlice = createSlice(
  {
    initialState,
    name: StoreNameSpace.Data,
    reducers: {
      setData(state, { payload }: PayloadAction<TEntity[]>) {
        state.entities = payload
      },
      addEntity(state, { payload }: PayloadAction<TEntity>) {
        state.entities.push(payload)
      }
    }
  }
)

export const { setData, addEntity } = dataSlice.actions

