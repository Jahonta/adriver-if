import type { TEntity } from '../types/entity'
import { prepareObjects } from './prepare-objects'

export const prepareJson = (data: TEntity[], columns: (keyof TEntity)[]) => {
  return JSON.stringify(prepareObjects(data, columns), null, 2)
}
