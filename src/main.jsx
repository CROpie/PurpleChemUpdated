import React from 'react'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

// import { TokenCtxProvider } from './contexts/TokenCtx'
import { RDKitCtxProvider } from './contexts/RDKitCtx'

// import Root, { rootLoader } from './routes/Root'
import PrivateRoot from './routes/PrivateRoot'
import Login from './components/sections/Login/Login'
import Inventory from './components/sections/Inventory/Inventory'
import { inventoryLoader } from './components/sections/Inventory/Inventory'
import Query from './components/sections/Query/Query'
import Order from './components/sections/Order/Order'
import { suppliersLoader } from './components/sections/Order/Order'
import Admin from './components/sections/Admin/Admin'
import AddUser from './components/sections/Admin/AddUser'
import AddSupplier from './components/sections/Admin/AddSupplier'

import PublicRoot from './routes/PublicRoot'
import { getSession } from './components/utils/SessionAPI'

const queryClient = new QueryClient()

const JWT = getSession()

const publicRoutes = [
  {
    path: '/',
    element: <PublicRoot />,
  },
]

const privateRoutes = [
  {
    path: '/',
    element: <PrivateRoot />,
    children: [
      {
        path: 'order',
        element: <Order />,
        loader: suppliersLoader(queryClient),
      },
      {
        path: 'inventory',
        element: <Inventory />,
        loader: inventoryLoader(queryClient),
      },
      {
        path: 'query',
        element: <Query />,
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'adduser',
            element: <AddUser />,
          },
          {
            path: 'addsupplier',
            element: <AddSupplier />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]

const router = createBrowserRouter([...(!JWT ? publicRoutes : []), ...privateRoutes])
console.log('routes: ', router.routes)

// before login, all routes are available. <PrivateRoot /> will prevent anything other than "/"
// also since public is earlier, "/" will refer to <PublicRoot />
// after login, private routes are able to be accessed
// when manually typing in a route, this component will re-render.
// router will then not include publicRoutes, thus "/" will refer to <PrivateRoot />

// still don't know how to get it to work with refresh token!
// probably easier to do it on the backend rather than frontend..?

// Still a major problem: when a token expires, nothing changes
// can't use APIs, but can still navigate around. if the pages have been previously loaded, then no code will run
// seems to be an issue with react-router 6
// just want some way to always run code! This is stupid

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      position="top-center"
      autoClose={750}
      hideProgressBar="true"
      transition={Flip}
    />
    <RDKitCtxProvider>
      <RouterProvider router={router} />
    </RDKitCtxProvider>
  </QueryClientProvider>
)
