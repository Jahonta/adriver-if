import { type JSX } from 'react'
import type { Row } from '@tanstack/react-table'
import Select from 'react-select'

import type { TEntity } from '../../types/entity'
import type { TEntityPriority } from '../../types/entity-priority'

import Priority from '../Priority'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { updatePriority } from '../../store/data/state'

type Option = {
  value: number;
  label: JSX.Element;
}

const options = [
  { value: 1, label: <Priority value={1} /> },
  { value: 2, label: <Priority value={2} /> },
  { value: 3, label: <Priority value={3} /> },
] as const

type TableCellSelectPriorityProps = {
  row: Row<TEntity>;
}

const TableCellSelectPriority = ({ row }: TableCellSelectPriorityProps) => {
  const dispatch = useAppDispatch()

  return <div>
    <Select<Option>
      name='priority'
      options={options}
      value={options.find((option) => option.value === row.getValue('priority'))}
      onChange={(selectedOption) => {
        dispatch(updatePriority({
          id: row.getValue('id'),
          priority: selectedOption!.value as TEntityPriority
        }))
      }}
    />
  </div>
}

export default TableCellSelectPriority
