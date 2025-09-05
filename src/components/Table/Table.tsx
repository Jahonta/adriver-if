import { useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import Filter from '../Filter'
import Pagination from '../Pagination'
import TableHeader from '../TableHeader'
import TableCell from '../TableCell'

import { useAppSelector } from '../../hooks/use-app-selector'
import { getIsLoggedIn } from '../../store/user/selectors'
import { getSelected } from '../../store/data/selectors'

import columns from './columns'
import styles from './Table.module.css'

type TableProps = {
  data: TEntity[];
}

const initialState = {
  columnPinning: {
    left: ['select', 'id'],
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
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const selected = useAppSelector(getSelected)

  const table = useReactTable({
    initialState: initialState,
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
    enableRowSelection: true,
    getRowId: (row) => row.id.toString()
  })

  useEffect(() => {
    table.setColumnVisibility({
      select: !isLoggedIn
    })
  }, [table, isLoggedIn])

  useEffect(() => {
    const rowSelection = selected.reduce((acc, curr) => {
      acc[curr] = true
      return acc
    }, {} as Record<TEntity['id'], boolean>)

    table.setRowSelection(rowSelection)
  }, [table, selected])

  return <div className={cn(styles.container)}>
    <Filter table={table} />
    {table.getRowModel().rows.length < 1
      ? 'Ничего не найдено'
      : <table className={cn(styles.table)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => <TableHeader key={header.id} header={header} />)}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => <TableCell key={cell.id} cell={cell} />)}
            </tr>)
          )}
        </tbody>
      </table>
    }
    <Pagination table={table} />
  </div>
}

export default Table
