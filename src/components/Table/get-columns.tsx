import { createColumnHelper, type FilterFn } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'
import type { TEntityPriority } from '../../types/entity-priority'

import { formatDate } from '../../utils/format-date'

import Priority from '../Priority'
import Status from '../Status'
import TableHeaderCheckbox from '../TableHeaderCheckbox'
import TableCellCheckbox from '../TableCellCheckbox'
import TableCellSelect from '../TableCellSelectPriority'
import TableCellSelectStatus from '../TableCellSelectStatus'

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

const getColumns = (isAdmin: boolean) => [
  columnHelper.display({
    id: 'select',
    enableHiding: true,
    header: ({ table }) => <TableHeaderCheckbox table={table} />,
    cell: ({ row }) => <TableCellCheckbox row={row} />,
    size: 79
  }),
  columnHelper.accessor('id', {
    cell: ({ getValue }) => getValue(),
    header: 'ID',
    filterFn: filterIdFn,
    sortDescFirst: false
  }),
  columnHelper.accessor('priority', {
    cell: (props) => isAdmin ? <TableCellSelect row={props.row} /> : <Priority value={props.getValue() as TEntityPriority} />,
    header: 'Приоритет',
    sortDescFirst: false
  }),
  columnHelper.accessor('status', {
    cell: (props) => isAdmin ? <TableCellSelectStatus row={props.row} /> : <Status value={props.getValue()} />,
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

export default getColumns
