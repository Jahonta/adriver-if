import { EntityStatus } from '../constants'

export type TEntityStatus = typeof EntityStatus[keyof typeof EntityStatus]
