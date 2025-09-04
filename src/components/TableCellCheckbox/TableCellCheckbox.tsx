import cn from 'classnames'
import type { Row } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'

import { useAppDispatch } from '../../hooks/use-app-dispatch'

import styles from './TableCellCheckbox.module.css'
import { addSelected, removeSelected } from '../../store/data/state'

type TableCellCheckboxProps = {
  row: Row<TEntity>;
}

const TableCellCheckbox = ({ row }: TableCellCheckboxProps) => {
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (row.getIsSelected()) {
      dispatch(removeSelected(row.getValue('id')))
    } else {
      dispatch(addSelected(row.getValue('id')))
    }

    row.getToggleSelectedHandler()(event)
  }

  return <div className={cn(styles.cell)}>
    <input className={cn(styles.checkbox)}
      type="checkbox"
      checked={row.getIsSelected()}
      onChange={handleChange}
    />
  </div>
}

export default TableCellCheckbox
