import cn from 'classnames'
import { Link } from 'react-router'

import { AppRoute } from '../../constants'

import styles from './Header.module.css'

const Header = () => {
  return <header className={cn(styles.container)}>
    <div className='wrapper'>
      <Link className={cn(styles.logo)} to={AppRoute.Root}>Рога и Копыта, Inc</Link>
    </div>
  </header >
}

export default Header
