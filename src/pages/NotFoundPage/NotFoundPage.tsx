import cn from 'classnames'

import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return <main className={cn(styles.container)}>
    <title>404 – Страница не найдена</title>
    <span className={cn(styles.code)}>404</span><br />
    Страница не найдена
  </main>
}

export default NotFoundPage
