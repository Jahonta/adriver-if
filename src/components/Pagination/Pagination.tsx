import cn from 'classnames'
import type { Table } from '@tanstack/react-table'

import type { TEntity } from '../../types/entity'

import { getPageGroups } from '../../utils/get-page-groups'

import styles from './Pagination.module.css'

type PaginationProps = {
  table: Table<TEntity>;
}

const Pagination = ({ table }: PaginationProps) => {
  const pagesTotal = table.getPageCount()

  if (pagesTotal < 2) {
    return null
  }

  const currentPage = table.getState().pagination.pageIndex
  const { first, center, last } = getPageGroups(pagesTotal, currentPage)

  return <div className={cn(styles.container)}>
    {first && <><button
      key={0}
      onClick={() => table.firstPage()}
      className={cn(styles.pageButton, {
        [styles.current]: currentPage === 0
      })}
    >
      {1}
    </button>
      ...
    </>}
    {center.map((pageIndex) => <button
      key={pageIndex}
      onClick={() => table.setPageIndex(pageIndex)}
      className={cn(styles.pageButton, {
        [styles.current]: pageIndex === currentPage
      })}
    >
      {pageIndex + 1}
    </button>)}
    {last && <>
      ...
      <button
        key={0}
        onClick={() => table.lastPage()}
        className={cn(styles.pageButton, {
          [styles.current]: currentPage === pagesTotal - 1
        })}
      >
        {pagesTotal}
      </button>
    </>}
  </div>
}

export default Pagination
