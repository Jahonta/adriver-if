import { useCallback, useEffect, useState, type RefObject } from 'react'

export const useModal = (ref: RefObject<HTMLDialogElement | null>) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const element = ref.current

    if (isOpen) {
      element.showModal()
    } else {
      element.close()
    }

    return () => {
      element.close()
    }
  }, [isOpen, ref])

  return { open, close, isOpen }
}
