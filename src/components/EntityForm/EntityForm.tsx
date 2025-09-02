import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import Select from 'react-select'

import type { TEntityFormData } from '../../types/entity-form-data'

import styles from './EntityForm.module.css'

const RESET_NOTIFICATION_TIME = 5000

type Option = {
  value: number;
  label: string;
}

type Notification = {
  type: 'error' | 'success';
  text: string;
}

type LoginFormProps = {
  handleSubmit: (data: TEntityFormData) => Promise<void>;
}

const initialState: TEntityFormData = {
  name: '',
  priority: 2,
  owner: ''
}

const options = [
  { value: 1, label: '1 (высокий)' },
  { value: 2, label: '2 (обычный)' },
  { value: 3, label: '3 (низкий)' },
] as const

const DEFAULT_OPTION = options[1]

const schema = Yup.object().shape({
  name: Yup.string().max(255, 'Максимальная длина – 255 символов').matches(/^[A-ZА-Я0-9_-]+$/i, 'Некорректное имя').required('Поле обязательно для заполнения'),
  owner: Yup.string().email('Некорректный email').required('Поле обязательно для заполнения'),
  priority: Yup.number().oneOf([1, 2, 3], 'Некорректный приоритет').required('Поле обязательно для заполнения')
})

const EntityForm = ({ handleSubmit }: LoginFormProps) => {
  const [notification, setNotification] = useState<Notification | null>(null)

  return <Formik
    initialValues={initialState}
    onReset={() => {
      setNotification(null)
    }}
    onSubmit={async (values, { resetForm }) => {
      try {
        await handleSubmit(values)
        resetForm()
        setNotification({
          type: 'success',
          text: 'Сущность успешно создана!'
        })

        setTimeout(() => {
          setNotification(null)
        }, RESET_NOTIFICATION_TIME)

      } catch {
        setNotification({
          type: 'error',
          text: 'Не удалось создать новую сущность. Попробуйте отправить форму ещё раз'
        })
      }
    }}
    validationSchema={schema}
  >{
      (formik) => <Form onSubmit={formik.handleSubmit} className={cn(styles.form)}>
        {notification && <div className={cn({
          [styles.notificationError]: notification.type === 'error',
          [styles.notificationSuccess]: notification.type === 'success',
        })
        }>{notification.text}</div>}
        <div className={cn(styles.fieldWrapper)}>
          <label className={cn(styles.label)} htmlFor='name'>Название</label>
          <Field
            id='name'
            className={cn(styles.input)}
            placeholder='Campaign'
            type='text'
            {...formik.getFieldProps('name')}
          />
          <ErrorMessage component='div' name='name' className={cn(styles.fieldError)} />
        </div>

        <div className={cn(styles.fieldWrapper)}>
          <label className={cn(styles.label)} htmlFor='owner'>Владелец</label>
          <Field
            id='owner'
            className={cn(styles.input)}
            placeholder='user@adriver.ru'
            type='email'
            {...formik.getFieldProps('owner')}
          />
          <ErrorMessage component='div' name='owner' className={cn(styles.fieldError)} />
        </div>

        <div className={cn(styles.fieldWrapper)}>
          <label className={cn(styles.label)} htmlFor='priority'>Приоритет</label>
          <Select<Option>
            name='priority'
            options={options}
            value={options.find((option) => option.value === formik.values.priority)}
            defaultValue={DEFAULT_OPTION}
            onChange={(selectedOption) => {
              formik.setFieldValue('priority', selectedOption?.value)
            }}
            isClearable={true}
          />
        </div>

        <div className={cn(styles.buttons)}>
          <button
            type='reset'
            onClick={() => formik.resetForm()}
            className={cn(styles.resetButton)}
          >Отменить
          </button>
          <button
            type='submit'
            className={cn(styles.submitButton)}
            disabled={formik.isSubmitting}
          >Создать
          </button>
        </div>

      </Form>
    }
  </Formik>
}

export default EntityForm
