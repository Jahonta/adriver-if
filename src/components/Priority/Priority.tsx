import cn from 'classnames'

import type { TEntityPriority } from '../../types/entity-priority'

import styles from './Priority.module.css'

type PriorityProps = {
  value: TEntityPriority;
}

const Priority = ({ value }: PriorityProps) => {
  return <div className={cn(styles.container, {
    [styles.high]: value === 1,
    [styles.medium]: value === 2,
    [styles.low]: value === 3,
  })}>{value}</div>
}

export default Priority
