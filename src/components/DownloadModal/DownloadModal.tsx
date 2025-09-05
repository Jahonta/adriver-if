import { memo, type RefObject } from 'react'
import cn from 'classnames'

import styles from './DownloadModal.module.css'

type DownloadModalProps = {
  onClose: () => void;
  ref: RefObject<HTMLDialogElement | null>;
}

const DownloadModal = ({ ref, onClose }: DownloadModalProps) => {
  return <dialog className={cn(styles.dialog)}
    ref={ref}
    onCancel={onClose}
  >
    <button className={cn(styles.cancelButton)}
      type='button' onClick={onClose}>Отмена</button>
  </dialog>
}

export default memo(DownloadModal)
