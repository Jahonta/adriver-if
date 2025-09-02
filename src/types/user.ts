import type { TEmail } from './email'
import type { TUserRole } from './user-role'

export type TUser = {
  login: TEmail;
  password: string;
  role: TUserRole;
}
