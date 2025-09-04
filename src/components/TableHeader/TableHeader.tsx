import { flexRender, type Header } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './TableHEader.module.css'

type TableHeaderProps = {
  header: Header<TEntity, unknown>;
}

const TableHeader = ({ header }: TableHeaderProps) => {
  const column = header.column

  return <th className={cn(styles.header, {
    [styles.pinned]: column.getIsPinned(),
    [styles.sortable]: column.getCanSort(),
    [styles.sorted]: column.getIsSorted()
  })}
    onClick={column.getToggleSortingHandler()}
    style={{
      left: `${column.getStart('left')}px`,
      borderTopLeftRadius: column.getIsFirstColumn('left')
        ? 'var(--border-radius-m)'
        : undefined,
      boxShadow: column.getIsLastColumn('left')
        ? '-4px 0 8px -4px var(--bgc-light) inset'
        : undefined
    }}
  >
    {flexRender(column.columnDef.header, header.getContext())}
    {column.getCanSort() && <button className={cn(styles.sortButton)}>
      {column.getNextSortingOrder() === 'asc'
        ? '⬇'
        : column.getNextSortingOrder() === 'desc'
          ? '⬆'
          : '✖️'}
    </button>}
  </th>
}

export default TableHeader
