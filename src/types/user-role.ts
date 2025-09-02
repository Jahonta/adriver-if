import type { UserRole } from '../constants'

export type TUserRole = typeof UserRole[keyof typeof UserRole]
