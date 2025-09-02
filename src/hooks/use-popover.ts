import { useEffect, useState } from 'react'

export const usePopover = () => {
  const [isShown, setIsShown] = useState(false)

  const togglePopover = () => {
    setIsShown(() => !isShown)
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShown(false)
      }
    }
    if (isShown) {
      document.addEventListener('keydown', handleEsc)
    } else {
      document.removeEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isShown])

  return [isShown, togglePopover] as [boolean, () => void]
}
