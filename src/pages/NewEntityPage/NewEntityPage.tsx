import cn from 'classnames'

import EntityForm from '../../components/EntityForm'

import type { TEntityFormData } from '../../types/entity-form-data'
import type { TEntityPriority } from '../../types/entity-priority'
import type { TEntity } from '../../types/entity'

import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { addEntity } from '../../store/data/state'

import { EntityStatus } from '../../constants'

import { generateId } from '../../utils/generate-id'

import styles from './NewEntityPage.module.css'

const NewEntityPage = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = ({ name, priority, owner }: TEntityFormData) => {
    const newEntity: TEntity = {
      id: generateId(),
      name: name,
      priority: priority as TEntityPriority,
      owner: owner,
      status: EntityStatus.New,
      timestamp: `${new Date().getTime()}`
    }

    dispatch(addEntity(newEntity))
    return Promise.resolve()
  }

  return <main className={cn(styles.container)}>
    <title>Добавление новой сущности</title>
    <EntityForm handleSubmit={handleSubmit} />
  </main>
}

export default NewEntityPage
