import cn from 'classnames'

import LoginForm from '../../components/LoginForm'

import type { TUser } from '../../types/user'

import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { login } from '../../store/user/state'

import styles from './LoginPage.module.css'

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = (data: TUser) => {
    dispatch(login({
      user: data.login,
      role: data.role
    }))
  }

  return <div className={cn(styles.container)}>
    <title>Вход</title>
    <LoginForm handleSubmit={handleSubmit} />
  </div>
}

export default LoginPage
