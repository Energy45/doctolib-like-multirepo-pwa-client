import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <></>
  },
  {
    path: '/register',
    element: <RegisterForm/>
  },
  {
    path: '/login',
    element: <LoginForm/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
