import type { TEntity } from '../types/entity'

export const prepareJson = (data: TEntity[], columns: (keyof TEntity)[]) => {
  const json = data.reduce((acc, curr) => {
    acc.push(columns.reduce((entity, key) => {
      entity[key] = curr[key]

      return entity
    }, {} as Record<string, string | number>))

    return acc
  }, [] as Partial<TEntity>[])

  return JSON.stringify(json, null, 2)
}
