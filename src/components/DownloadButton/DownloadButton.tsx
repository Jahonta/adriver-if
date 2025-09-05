import { memo, useRef } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { useAppSelector } from '../../hooks/use-app-selector'
import { hasSelected } from '../../store/data/selectors'

import { useModal } from '../../hooks/use-modal'

import DownloadModal from '../DownloadModal'

import styles from './DownloadButton.module.css'

const DownloadButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { close, open, isOpen } = useModal(modalRef)
  const isDisabled = !useAppSelector(hasSelected)

  return <>
    <button
      className={cn(styles.button)}
      disabled={isDisabled}
      onClick={open}
    >
      <img src="/icons/download.svg" alt="Выгрузить выбранное" />
    </button>
    {isOpen && createPortal(
      <DownloadModal ref={modalRef} onClose={close} />,
      document.body
    )}
  </>
}

export default memo(DownloadButton)
