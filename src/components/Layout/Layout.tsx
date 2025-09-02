import { Outlet } from 'react-router'
import cn from 'classnames'

import Header from '../Header'
import Footer from '../Footer'
import Nav from '../Nav'

import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={cn(styles.container)}>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
