import cn from 'classnames'
import { utils, writeFile } from 'xlsx'

import type { TEntity } from '../../types/entity'

import { prepareJson } from '../../utils/prepare-json'
import { prepareCsv } from '../../utils/prepare-csv'
import { prepareObjects } from '../../utils/prepare-objects'
import { saveFile } from '../../utils/save-file'

import styles from './DownloadFormats.module.css'

type DownloadFormatsProps = {
  data: TEntity[];
  columns: (keyof TEntity)[];
}

const DownloadFormats = ({ data, columns }: DownloadFormatsProps) => {
  const handleJsonClick = () => {
    const content = prepareJson(data, columns)
    saveFile(content, 'entries.json', 'application/json')
  }

  const handleCsvClick = () => {
    const content = prepareCsv(data, columns)
    saveFile(content, 'entries.csv', 'text/csv')
  }

  const handleXlsxClick = () => {
    const content = prepareObjects(data, columns)
    const sheet = utils.json_to_sheet(content)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, sheet, 'Entities')
    writeFile(workbook, 'entities.xlsx')
  }

  return <div className={cn(styles.container)}>Загрузить данные в формате:
    <ul className={cn(styles.buttonsList)}>
      <li><button className={cn(styles.button)}
        type='button'
        onClick={handleJsonClick}
      >json</button></li>
      <li><button className={cn(styles.button)}
        type='button'
        onClick={handleCsvClick}
      >csv</button></li>
      <li><button className={cn(styles.button)}
        type='button'
        onClick={handleXlsxClick}
      >xlsx</button></li>
    </ul>
  </div>
}

export default DownloadFormats
