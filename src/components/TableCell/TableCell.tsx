import { flexRender, type Cell } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './TableCell.module.css'

type TableCellProps = {
  cell: Cell<TEntity, unknown>;
}

const TableCell = ({ cell }: TableCellProps) => {
  return <td className={cn(styles.cell, {
    [styles.pinned]: cell.column.getIsPinned()
  })}
    key={cell.id}>
    {flexRender(
      cell.column.columnDef.cell,
      cell.getContext(),
    )}
  </td>
}

export default TableCell
