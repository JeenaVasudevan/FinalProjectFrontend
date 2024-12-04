import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
   <RouterProvider router={router} />
    <Toaster />
    </>
  )
}

export default App