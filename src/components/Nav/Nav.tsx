import cn from 'classnames'
import { Link, NavLink, useLocation } from 'react-router'

import { useAppSelector } from '../../hooks/use-app-selector'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { logout } from '../../store/user/state'
import { dropSelected } from '../../store/data/state'
import { getIsAdmin, getIsLoggedIn, getUserEmail } from '../../store/user/selectors'

import { AppRoute } from '../../constants'

import styles from './Nav.module.css'

const Nav = () => {
  const dispatch = useAppDispatch()
  const isAdmin = useAppSelector(getIsAdmin)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const email = useAppSelector(getUserEmail)
  const location = useLocation()
  const shouldDisplayLoginNav = location.pathname !== AppRoute.Login

  const handleLogout = () => {
    dispatch(dropSelected())
    dispatch(logout())
  }

  return <div className='wrapper'>
    <nav className={cn(styles.container)}>
      {isAdmin && <div className={cn(styles.adminNav)}>
        <ul>
          <li><NavLink
            to={AppRoute.List}>Список</NavLink></li>
          <li><NavLink to={AppRoute.NewEntity}>+ Создать</NavLink></li>
        </ul>
      </div>}
      {shouldDisplayLoginNav && <div className={cn(styles.loginNav)}>
        {isLoggedIn
          ? <div className={cn(styles.userInfo)}>
            <span>
              <img src="/icons/profile.svg" alt="" aria-hidden />
              {email}
            </span>
            <button className={cn(styles.logoutButton)}
              onClick={handleLogout}>Выйти</button>
          </div>
          : <Link to={AppRoute.Login}>Войти</Link>}
      </div>}
    </nav>
  </div>
}

export default Nav
