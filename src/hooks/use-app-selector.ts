import { useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { TState } from '../types/state'

export const useAppSelector: TypedUseSelectorHook<TState> = useSelector
