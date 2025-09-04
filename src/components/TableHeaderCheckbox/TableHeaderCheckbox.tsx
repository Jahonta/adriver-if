import cn from 'classnames'
import type { Table } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'

import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { dropSelected, selectAll } from '../../store/data/state'

import styles from './TableHeaderCheckbox.module.css'

type TableHeaderCheckboxProps = {
  table: Table<TEntity>;
}

const TableHeaderCheckbox = ({ table }: TableHeaderCheckboxProps) => {
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (table.getIsAllRowsSelected()) {
      dispatch(dropSelected())
    } else {
      dispatch(selectAll())
    }

    table.getToggleAllRowsSelectedHandler()(event)
  }

  return <div className={cn(styles.header)}>
    <button
      className={cn(styles.uploadButton)}
      disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
    ><img src="/download.svg" alt="Выгрузить выбранное" /></button>
    <input className={cn(styles.checkbox, {
      [styles.checkedSome]: table.getIsSomeRowsSelected()
    })}
      type="checkbox"
      checked={table.getIsAllRowsSelected()}
      onChange={handleChange}
    />
  </div>
}

export default TableHeaderCheckbox
