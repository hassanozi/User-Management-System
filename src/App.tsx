
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Login from './Components/Login/Login'
import AuthLayout from './Components/Shared/AuthLayout/AuthLayout'
import MasterLayout from './Components/Shared/MasterLayout/MasterLayout'
import NotFound from './Components/Shared/NotFound/NotFound'
import UserProfile from './Components/UserProfile/UserProfile'
import UsersData from './Components/UsersData/UsersData'
import UsersList from './Components/UsersList/UsersList'

function App() {
  
  const routes = createBrowserRouter([
    {
      path: '',element:<AuthLayout/>,errorElement:<NotFound/>,
      children: [
        {index:true,element:<Login />},
        {path:'login',element:<Login />}
      ]
    },
    {
      path: 'home',element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children: [
        {index:true,element:<UsersList/>},
        {path:'users-list',element:<UsersList/>},
        {path:'user-data', element: <UsersData /> },
        {path:'user-data/:id', element:<UsersData/> },
        {path:'user-profile/:id',element:<UserProfile/>}      ]
    }
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
