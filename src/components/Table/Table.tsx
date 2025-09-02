import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './Table.module.css'
import columns from './columns'
import Filter from '../Filter'
import Pagination from '../Pagination'
import TableHeader from '../TableHeader'
import TableCell from '../TableCell'

type TableProps = {
  data: TEntity[];
}

const initialState = {
  columnPinning: {
    left: ['id'],
    right: [],
  },
  sorting: [
    {
      id: 'priority',
      desc: false,
    },
    {
      id: 'timestamp',
      desc: true,
    },
  ],
  pagination: {
    pageSize: 5
  }
}

const Table = ({ data }: TableProps) => {
  const table = useReactTable({
    initialState: initialState,
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true
  })

  return <div className={cn(styles.container)}>
    <Filter table={table} />
    {table.getRowModel().rows.length < 1
      ? 'Ничего не найдено'
      : <table className={cn(styles.table)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => <TableHeader header={header} />)}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => <TableCell cell={cell} />)}
            </tr>)
          )}
        </tbody>
      </table>
    }
    <Pagination table={table} />
  </div>
}

export default Table
