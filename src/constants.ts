export const AppRoute = {
  Root: '/',
  Login: '/login',
  List: '/list',
  NewEntity: '/new'
} as const

export const StoreNameSpace = {
  User: 'USER',
  Data: 'DATA'
} as const

export const UserRole = {
  Guest: 'GUEST',
  User: 'USER',
  Admin: 'ADMIN'
} as const

export const EntityStatus = {
  New: 'new',
  Working: 'working',
  Done: 'done',
  Error: 'error'
}
