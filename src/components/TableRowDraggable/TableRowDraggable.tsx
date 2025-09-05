import type { Row } from '@tanstack/react-table'
import { horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import TableCellDraggable from '../TableCellDraggable'

import styles from './TableRowDraggable.module.css'

type TableRowDraggableProps = {
  row: Row<TEntity>;
  columnOrder: string[];
}

const TableRowDraggable = ({ row, columnOrder }: TableRowDraggableProps) => {
  const { transform, transition, setNodeRef, isDragging, attributes, listeners } = useSortable({
    id: row.original.id,
  })

  return (
    <tr className={cn(styles.row)}
      style={{
        transition: transition,
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 1 : 0,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      ref={setNodeRef}
      {...attributes} {...listeners}>
      {row.getVisibleCells().map((cell) => <SortableContext
        key={cell.id}
        items={columnOrder}
        strategy={horizontalListSortingStrategy}
      >
        <TableCellDraggable key={cell.id} cell={cell} />
      </SortableContext>)}
    </tr>
  )
}

export default TableRowDraggable
