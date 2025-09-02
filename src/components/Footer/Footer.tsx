import cn from 'classnames'

import styles from './Footer.module.css'

const Footer = () => {
  return <footer className={cn(styles.container)}>
    &copy; Lydia Zakharova<br />
    2025
  </footer >
}

export default Footer
