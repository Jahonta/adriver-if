import { memo, type RefObject } from 'react'
import cn from 'classnames'

import { useAppSelector } from '../../hooks/use-app-selector'
import { getSelectedEntities } from '../../store/data/selectors'

import DownloadTable from '../DownloadTable'

import styles from './DownloadModal.module.css'

type DownloadModalProps = {
  onClose: () => void;
  ref: RefObject<HTMLDialogElement | null>;
}

const DownloadModal = ({ ref, onClose }: DownloadModalProps) => {
  const entities = useAppSelector(getSelectedEntities)

  return <dialog className={cn(styles.dialog)}
    ref={ref}
    onCancel={onClose}
  >
    <button className={cn(styles.cancelButton)}
      type='button' onClick={onClose}>Закрыть</button>
    <DownloadTable data={entities} />
  </dialog>
}

export default memo(DownloadModal)
