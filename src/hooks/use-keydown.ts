import { useEffect, type RefObject } from 'react'

export const useKeydown = (key: string, callback: () => void, ref: RefObject<HTMLElement | null>,) => {
  useEffect(() => {
    if (!ref.current) {
      return
    }

    const element = ref.current

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    element.addEventListener('keydown', handleKeydown)

    return () => {
      element.removeEventListener('keydown', handleKeydown)
    }
  }, [key, ref, callback])
}
