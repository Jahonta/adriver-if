import type { AppRoute } from '../constants'

export type TAppRoute = typeof AppRoute[keyof typeof AppRoute]
