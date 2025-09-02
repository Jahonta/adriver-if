import { useCallback } from 'react'
import type { Table } from '@tanstack/react-table'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import FilterId from '../FilterId'
import FilterName from '../FilterName'
import FilterDate from '../FilterDate'

import styles from './Filter.module.css'

type FilterProps = {
  table: Table<TEntity>;
}

const Filter = ({ table }: FilterProps) => {
  const handleIdChange = useCallback((ids: TEntity['id'][]) => {
    table.getColumn('id')?.setFilterValue(ids)
  }, [table])

  const handleNameChange = useCallback((name: TEntity['name']) => {
    table.getColumn('name')?.setFilterValue(name)
  }, [table])

  const handleDateChange = useCallback((dates: [number | null, number | null]) => {
    table.getColumn('timestamp')?.setFilterValue(dates)
  }, [table])

  return <div className={cn(styles.container)}>
    <FilterId onChange={handleIdChange} />
    <FilterName onChange={handleNameChange} />
    <FilterDate onChange={handleDateChange} />
  </div>
}

export default Filter
