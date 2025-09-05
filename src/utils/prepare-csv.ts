import type { TEntity } from '../types/entity'

export const prepareCsv = (data: TEntity[], columns: (keyof TEntity)[]) => {
  const title = columns.join(',') + '\n'
  const content = data
    .map((entry) => columns
      .map((column) => entry[column])
      .join(','))
    .join('\n')

  return title + content
}
