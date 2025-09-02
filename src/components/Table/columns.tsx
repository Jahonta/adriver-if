import { createColumnHelper, type FilterFn } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'
import type { TEntityPriority } from '../../types/entity-priority'

import { formatDate } from '../../utils/format-date'

import Priority from '../Priority'
import Status from '../Status'

const columnHelper = createColumnHelper<TEntity>()

const filterIdFn: FilterFn<TEntity> = (row, _, value: TEntity['id'][]) => value.length === 0
  || value.includes(row.getValue('id'))

const filterNameFn: FilterFn<TEntity> = (row, _, value: TEntity['name']) => value.length === 0
  || (row.getValue<TEntity['name']>('name')).toLowerCase().includes(value.toLowerCase())

const filterTimestapFn: FilterFn<TEntity> = (row, _, value: [number | null, number | null]) => {
  const [start, end] = value

  const timestamp = parseInt(row.getValue<TEntity['timestamp']>('timestamp'), 10)

  if (!start && end) {
    return timestamp <= end
  }

  if (start && !end) {
    return timestamp >= start
  }

  if (start && end) {
    return timestamp >= start && timestamp <= end
  }

  return true
}

const columns = [
  columnHelper.accessor('id', {
    cell: ({ getValue }) => getValue(),
    header: 'ID',
    filterFn: filterIdFn,
    sortDescFirst: false
  }),
  columnHelper.accessor('priority', {
    cell: ({ getValue }) => <Priority value={getValue() as TEntityPriority} />,
    header: 'Приоритет',
    sortDescFirst: false
  }),
  columnHelper.accessor('status', {
    cell: ({ getValue }) => <Status value={getValue()} />,
    header: 'Статус',
    enableSorting: false,
  }),
  columnHelper.accessor('name', {
    cell: ({ getValue }) => getValue(),
    header: 'Название',
    filterFn: filterNameFn
  }),
  columnHelper.accessor('timestamp', {
    cell: ({ getValue }) => formatDate(new Date(parseInt(getValue(), 10))),
    header: 'Время создания',
    filterFn: filterTimestapFn
  }),
  columnHelper.accessor('owner', {
    cell: ({ getValue }) => getValue(),
    header: 'Владелец',
    enableSorting: false,
  }),
]

export default columns
