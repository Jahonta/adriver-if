import { flexRender, type Header } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './TableHeaderDraggable.module.css'

type TableHeaderDraggableProps = {
  header: Header<TEntity, unknown>;
}

const TableHeaderDraggable = ({ header }: TableHeaderDraggableProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
    id: header.column.id,
  })

  return (
    <th
      className={cn(styles.header)}
      style={{
        transform: CSS.Translate.toString(transform),
        width: header.column.getSize(),
        zIndex: isDragging ? 1 : 0,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      ref={setNodeRef} {...attributes} {...listeners}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
}

export default TableHeaderDraggable
