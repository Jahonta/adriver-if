import { RouterProvider } from 'react-router'
import router from './router'
import { useEffect } from 'react'

import { useAppDispatch } from './hooks/use-app-dispatch'

import { setData } from './store/data/state'

import data from './data'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setData(data.list))
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}

export default App
