import { flexRender, type Header } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './TableHEader.module.css'

type TableHeaderProps = {
  header: Header<TEntity, unknown>;
}

const TableHeader = ({ header }: TableHeaderProps) => {
  return <th className={cn(styles.header, {
    [styles.pinned]: header.column.getIsPinned(),
    [styles.sortable]: header.column.getCanSort(),
    [styles.sorted]: header.column.getIsSorted()
  })}
    onClick={header.column.getToggleSortingHandler()}
    key={header.id}>
    {flexRender(header.column.columnDef.header, header.getContext())}
    {header.column.getCanSort() && <button className={cn(styles.sortButton)}>
      {header.column.getNextSortingOrder() === 'asc'
        ? '⬇'
        : header.column.getNextSortingOrder() === 'desc'
          ? '⬆'
          : '✖️'}
    </button>}
  </th>
}

export default TableHeader
