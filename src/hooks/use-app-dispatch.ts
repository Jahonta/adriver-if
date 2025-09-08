import { useDispatch } from 'react-redux'

import type { TAppDispatch } from '../types/state'

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
