import { useState } from 'react'
import cn from 'classnames'

import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
registerLocale('ru', ru)

import styles from './FilterDate.module.css'

type FilterDateProps = {
  onChange: (dates: [number | null, number | null]) => void;
}

const FilterDate = ({ onChange }: FilterDateProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const onBlur = () => {
    const start = startDate
      ? new Date(startDate.setHours(0, 0, 0)).getTime()
      : null
    const end = endDate
      ? new Date(endDate.setHours(23, 59, 59)).getTime()
      : null

    onChange([start, end])
  }

  return <div className={cn(styles.container)}>
    <label htmlFor='date'>Дата создания</label>
    <DatePicker
      name='date'
      className={cn(styles.input)}
      onChange={onDateChange}
      onBlur={onBlur}
      onCalendarClose={onBlur}
      dateFormat="dd.MM.yyyy"
      shouldCloseOnSelect
      selectsRange
      startDate={startDate}
      endDate={endDate}
      locale={'ru'}
    />
  </div>
}

export default FilterDate
