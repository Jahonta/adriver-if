import { useState } from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import cn from 'classnames'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

import type { TEntity } from '../../types/entity'

import VisibilityControl from '../VisibilityControl'
import TableHeaderDraggable from '../TableHeaderDraggable'
import TableCellDraggable from '../TableCellDraggable'

import columns from './columns'

import styles from './DownloadTable.module.css'

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

const initialColumnOrderState = ['id', 'priority', 'status', 'name', 'timestamp', 'owner']

const DownloadTable = ({ data }: DownloadTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(intitialColumnVisibilityState)
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumnOrderState)

  const table = useReactTable({
    columns: columns,
    data: data,
    state: {
      columnVisibility,
      columnOrder
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
    enableSorting: false
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string)
        const newIndex = columnOrder.indexOf(over.id as string)
        return arrayMove(columnOrder, oldIndex, newIndex)
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  return <div className={cn(styles.container)}>
    <VisibilityControl table={table} />
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <table className={cn(styles.table)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => <TableHeaderDraggable key={header.id} header={header} />)}
              </SortableContext>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>

              {row.getVisibleCells().map((cell) => <SortableContext
                key={cell.id}
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                <TableCellDraggable key={cell.id} cell={cell} />
              </SortableContext>)}
            </tr>)
          )}
        </tbody>
      </table>
    </DndContext>
  </div >
}

export default DownloadTable
