
import { flexRender, type Cell } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './TableCellDraggable.module.css'

type TableCellDraggableProps = {
  cell: Cell<TEntity, unknown>;
}

const TableCellDraggable = ({ cell }: TableCellDraggableProps) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  })

  return (
    <td className={cn(styles.cell)}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        width: cell.column.getSize(),
        zIndex: isDragging ? 1 : 0
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}

export default TableCellDraggable
