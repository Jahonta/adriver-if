import { useRef } from 'react'
import cn from 'classnames'

import type { TEntity } from '../../types/entity'

import { useKeydown } from '../../hooks/use-keydown'

import styles from './FilterName.module.css'

type FilterNameProps = {
  onChange: (name: TEntity['name']) => void;
}

const FilterName = ({ onChange }: FilterNameProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBlur = () => {
    if (!inputRef.current) {
      return
    }

    const name = inputRef.current.value.trim()

    onChange(name)
  }

  useKeydown('Enter', handleBlur, inputRef)

  return <div className={cn(styles.container)}>
    <label htmlFor='name'>Название</label>
    <input className={cn(styles.input)}
      type="text"
      id='name'
      name='name'
      ref={inputRef}
      onBlur={handleBlur}
    />
  </div>
}

export default FilterName
