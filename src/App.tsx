import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { Dashboard } from './components/Dashboard'
import { Appointments } from './components/Appointments'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '/register',
    element: <RegisterForm/>
  },
  {
    path: '/login',
    element: <LoginForm/>
  },
  {
    path: '/appointments',
    element: <Appointments/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
