import type { TEntity } from '../types/entity'

export const prepareObjects = (data: TEntity[], columns: (keyof TEntity)[]) => {
  return data.reduce((acc, curr) => {
    acc.push(columns.reduce((entity, key) => {
      entity[key] = curr[key]

      return entity
    }, {} as Record<string, string | number>))

    return acc
  }, [] as Partial<TEntity>[])
}
