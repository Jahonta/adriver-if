import { memo, useCallback, useRef } from 'react'
import cn from 'classnames'

import { usePopover } from '../../hooks/use-popover'
import { useKeydown } from '../../hooks/use-keydown'

import type { TEntity } from '../../types/entity'

import styles from './FilterId.module.css'

type FilterIdProps = {
  onChange: (ids: TEntity['id'][]) => void;
}

const FilterId = ({ onChange }: FilterIdProps) => {
  const [isShown, togglePopover] = usePopover()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBlur = useCallback(() => {
    if (!inputRef.current) {
      return
    }

    const ids = inputRef.current.value
      .replaceAll(' ', '')
      .split(',')
      .map((id) => parseInt(id, 10))
      .filter((id) => !Number.isNaN(id))

    onChange(ids)
  }, [onChange])

  useKeydown('Enter', handleBlur, inputRef)

  return <div className={cn(styles.container)}>
    <label className={cn(styles.label)} htmlFor='id'>ID
      <button className={cn(styles.infoButton)} onClick={togglePopover}
      >ℹ</button>
      <div className={cn(styles.infoPopover, {
        [styles.isShown]: isShown
      })}
        tabIndex={0}
        onBlur={togglePopover}
      >ID разделяются запятой. Например: 111, 222, 333</div>
    </label>
    <input className={cn(styles.input)}
      type="text"
      id='id'
      name='id'
      ref={inputRef}
      onBlur={handleBlur}
    />
  </div>
}

export default memo(FilterId)
