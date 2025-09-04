import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { TEntity } from '../../types/entity'

import { StoreNameSpace } from '../../constants'

export type DataState = {
  entities: TEntity[];
  selected: TEntity['id'][];
}

const initialState: DataState = {
  entities: [],
  selected: []
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
      },
      addSelected(state, { payload }: PayloadAction<TEntity['id']>) {
        state.selected.push(payload)
      },
      removeSelected(state, { payload }: PayloadAction<TEntity['id']>) {
        state.selected = state.selected.filter((id) => id !== payload)
      },
      selectAll(state) {
        state.selected = state.entities.map((entity) => entity.id)
      },
      dropSelected(state) {
        state.selected = []
      }
    }
  }
)

export const {
  setData,
  addEntity,
  addSelected,
  removeSelected,
  selectAll,
  dropSelected
} = dataSlice.actions

