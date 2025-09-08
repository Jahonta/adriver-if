import { type JSX } from 'react'
import type { Row } from '@tanstack/react-table'
import Select from 'react-select'

import type { TEntity } from '../../types/entity'
import type { TEntityStatus } from '../../types/entity-status'

import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { updateStatus } from '../../store/data/state'
import { EntityStatus } from '../../constants'

import Status from '../Status'

type Option = {
  value: TEntityStatus;
  label: JSX.Element;
}

const options = [
  { value: EntityStatus.Done, label: <Status value={EntityStatus.Done} /> },
  { value: EntityStatus.Working, label: <Status value={EntityStatus.Working} /> },
  { value: EntityStatus.Error, label: <Status value={EntityStatus.Error} /> },
  { value: EntityStatus.New, label: <Status value={EntityStatus.New} /> },
] as const

type TableCellSelectStatusProps = {
  row: Row<TEntity>;
}

const TableCellSelectStatus = ({ row }: TableCellSelectStatusProps) => {
  const dispatch = useAppDispatch()

  return <div>
    <Select<Option>
      name='priority'
      options={options}
      value={options.find((option) => option.value === row.getValue('status'))}
      onChange={(selectedOption) => {
        dispatch(updateStatus({
          id: row.getValue('id'),
          status: selectedOption!.value as TEntityStatus
        }))
      }}
    />
  </div>
}

export default TableCellSelectStatus
