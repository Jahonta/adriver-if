import type { TEmail } from './email'
import type { TEntityPriority } from './entity-priority'
import type { TEntityStatus } from './entity-status'

export type TEntity = {
  id: number;
  name: string;
  priority: TEntityPriority;
  status: TEntityStatus;
  timestamp: `${number}`;
  owner: TEmail;
}
