import { useMemo, useState } from 'react'
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
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import type { TEntity } from '../../types/entity'

import DownloadFormats from '../DownloadFormats'
import VisibilityControl from '../VisibilityControl'
import TableHeaderDraggable from '../TableHeaderDraggable'
import TableRowDraggable from '../TableRowDraggable'

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
  const [processedData, setProcessedData] = useState<TEntity[]>(data)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(intitialColumnVisibilityState)
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumnOrderState)
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => processedData.map(({ id }) => id),
    [processedData])
  const columnsToDownload = useMemo(
    () => columnOrder.filter((id) => columnVisibility[id]) as (keyof TEntity)[],
    [columnOrder, columnVisibility])

  const table = useReactTable({
    columns: columns,
    data: processedData,
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

    if (columnOrder.includes(active.id as string)) {
      if (active && over && active.id !== over.id) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string)
          const newIndex = columnOrder.indexOf(over.id as string)
          return arrayMove(columnOrder, oldIndex, newIndex)
        })
      }
    }

    if (dataIds.includes(active.id as number)) {
      if (active && over && active.id !== over.id) {
        setProcessedData((data) => {
          const oldIndex = dataIds.indexOf(active.id)
          const newIndex = dataIds.indexOf(over.id)
          return arrayMove(data, oldIndex, newIndex)
        })
      }
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  return <div className={cn(styles.container)}>
    <DownloadFormats data={processedData} columns={columnsToDownload} />
    <VisibilityControl table={table} />
    <div className={cn(styles.preview)}>
      <div className={cn(styles.label)}>Порядок колонок и строк</div>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
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
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRowDraggable key={row.id} row={row} columnOrder={columnOrder} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  </div >
}

export default DownloadTable
