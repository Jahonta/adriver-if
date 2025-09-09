import cn from 'classnames'

import Table from '../../components/Table'

import { useAppSelector } from '../../hooks/use-app-selector'
import { getEntities } from '../../store/data/selectors'

import styles from './ListPage.module.css'

const ListPage = () => {
  const entities = useAppSelector(getEntities)

  if (entities.length === 0) {
    return <div className={cn(styles.empty)}>Список пуст</div>
  }

  return <main className={cn('wrapper', styles.container)}>
    <title>Список сущностей</title>
    <Table data={entities} />
  </main>
}

export default ListPage
