import { createColumnHelper } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'

const columnHelper = createColumnHelper<TEntity>()

const columns = [
  columnHelper.accessor('id', {
    cell: ({ getValue }) => getValue(),
    header: 'ID'
  }),
  columnHelper.accessor('priority', {
    cell: ({ getValue }) => getValue(),
    header: 'Приоритет'
  }),
  columnHelper.accessor('status', {
    cell: ({ getValue }) => getValue(),
    header: 'Статус'
  }),
  columnHelper.accessor('name', {
    cell: ({ getValue }) => getValue(),
    header: 'Название'
  }),
  columnHelper.accessor('timestamp', {
    cell: ({ getValue }) => getValue(),
    header: 'Временная метка'
  }),
  columnHelper.accessor('owner', {
    cell: ({ getValue }) => getValue(),
    header: 'Владелец'
  }),
]

export default columns
