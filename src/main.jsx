import React from 'react'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

import { TokenCtxProvider } from './contexts/TokenCtx'
import { RDKitCtxProvider } from './contexts/RDKitCtx'

import Root from './routes/Root'
import Login from './components/sections/Login/Login'
import Inventory from './components/sections/Inventory/Inventory'
import { inventoryLoader } from './components/sections/Inventory/Inventory'
import Query from './components/sections/Query/Query'
import Order from './components/sections/Order/Order'
import { suppliersLoader } from './components/sections/Order/Order'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar="true"
      transition={Flip}
    />
    <TokenCtxProvider>
      <RDKitCtxProvider>
        <RouterProvider router={router} />
      </RDKitCtxProvider>
    </TokenCtxProvider>
  </QueryClientProvider>
)
