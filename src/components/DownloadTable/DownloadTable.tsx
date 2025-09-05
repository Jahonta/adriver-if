import { useState } from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import TableHeader from '../TableHeader'
import TableCell from '../TableCell'

import columns from './columns'

import styles from './DownloadTable.module.css'
import VisibilityControl from '../VisibilityControl'

type DownloadTableProps = {
  data: TEntity[];
}

const intitialColumnVisibilityState = {
  id: true,
  priority: true,
  status: true,
  name: true,
  timestamp: true,
  owner: true
}

const DownloadTable = ({ data }: DownloadTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(intitialColumnVisibilityState)
  const table = useReactTable({
    columns: columns,
    data: data,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
    enableSorting: false
  })

  return <div className={cn(styles.container)}>
    <VisibilityControl table={table} />
    <table className={cn(styles.table)}>
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
  </div>
}

export default DownloadTable
