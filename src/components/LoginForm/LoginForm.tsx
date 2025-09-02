import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'

import type { TUser } from '../../types/user'

import { UserRole } from '../../constants'

import styles from './LoginForm.module.css'

type LoginFormProps = {
  handleSubmit: (data: TUser) => void;
}

const initialState = {
  login: '',
  password: '',
  isAdmin: false
}

const schema = Yup.object().shape({
  password: Yup.string().required('Поле обязательно для заполнения'),
  login: Yup.string().email('Некорректный email').required('Поле обязательно для заполнения'),
})

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev)
  }

  return <Formik
    initialValues={initialState}
    onSubmit={({ login, password, isAdmin }, { resetForm }) => {
      const data: TUser = {
        login: login,
        password: password,
        role: isAdmin ? UserRole.Admin : UserRole.User
      }

      handleSubmit(data)
      resetForm()
    }}
    validationSchema={schema}
  >{
      (formik) => <Form onSubmit={formik.handleSubmit} className={cn(styles.form)}>
        <div className={cn(styles.fieldWrapper)}>
          <label className={cn(styles.label)} htmlFor='login'>Email</label>
          <Field
            id='login'
            className={cn(styles.input)}
            placeholder='user@adriver.ru'
            type='email'
            {...formik.getFieldProps('login')}
          />
          <ErrorMessage component='div' name='login' className={cn(styles.fieldError)} />
        </div>

        <div className={cn(styles.fieldWrapper)}>
          <label className={cn(styles.label)} htmlFor='password'>Пароль</label>
          <Field
            id='password'
            className={cn(styles.input)}
            placeholder='••••••••'
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
          />
          <button
            className={cn(styles.showPasswordButton)}
            onClick={handleShowPasswordClick}
            type='button'>
            {showPassword
              ? <img src="/hide-password.svg" alt="Скрыть пароль" />
              : <img src="/show-password.svg" alt="Показать пароль" />
            }
          </button>
          <ErrorMessage component='div' name='password' className={cn(styles.fieldError)} />
        </div>

        <div className={cn(styles.fieldWrapper)}>
          <label htmlFor='isAdmin'>Войти как администратор</label>
          <input
            id='isAdmin'
            className={cn(styles.checkbox)}
            type='checkbox'
            checked={formik.values.isAdmin}
            onChange={formik.handleChange}
          />
        </div>
        <button
          type='submit'
          className={cn(styles.submitButton)}
        >Отправить
        </button>
      </Form>
    }
  </Formik>
}

export default LoginForm
