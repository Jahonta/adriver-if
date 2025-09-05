import { type Table } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import styles from './VisibilityControl.module.css'

type VisibilityControlProps = {
  table: Table<TEntity>;
}

const VisibilityControl = ({ table }: VisibilityControlProps) => {
  return <fieldset className={cn(styles.container)}>
    <legend className={cn(styles.title)}>Видимость колонок</legend>
    {['id', 'priority', 'status', 'name', 'timestamp', 'owner']
    .map((id) => table.getColumn(id)!)
    .map((column) => (
      <div key={column.id}>
        <label className={cn(styles.label)}>
          <input
            className={cn(styles.checkbox)}
            type='checkbox'
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />
          {column.columnDef.header?.toString()}
        </label>
      </div>
    ))}
  </fieldset>
}

export default VisibilityControl
