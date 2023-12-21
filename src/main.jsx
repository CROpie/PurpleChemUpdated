import React from 'react'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

import { RDKitCtxProvider } from './contexts/RDKitCtx'
import { ModalCtxProvider } from './contexts/ModalCtx'

import Root from './routes/Root'
import Inventory from './components/sections/Inventory/Inventory'
import { inventoryLoader } from './components/sections/Inventory/Inventory'
import Query from './components/sections/Query/Query'
import Order from './components/sections/Order/Order'
import { suppliersLoader } from './components/sections/Order/Order'
import Admin from './components/sections/Admin/Admin'
import AddUser from './components/sections/Admin/AddUser'
import AddSupplier from './components/sections/Admin/AddSupplier'
import ModifySupplier, { adminSuppliersLoader } from './components/sections/Admin/ModifySupplier'
import ModifyChemical, { adminChemicalsLoader } from './components/sections/Admin/ModifyChemical'
import ModifyOrder, { adminOrdersLoader } from './components/sections/Admin/ModifyOrder'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
          {
            path: 'modifysupplier',
            element: <ModifySupplier />,
            loader: adminSuppliersLoader(queryClient),
          },
          {
            path: 'modifychemical',
            element: <ModifyChemical />,
            loader: adminChemicalsLoader(queryClient),
          },
          {
            path: 'modifyorder',
            element: <ModifyOrder />,
            loader: adminOrdersLoader(queryClient),
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      position="top-center"
      autoClose={750}
      hideProgressBar="true"
      transition={Flip}
    />
    <RDKitCtxProvider>
      <ModalCtxProvider>
        <RouterProvider router={router} />
      </ModalCtxProvider>
    </RDKitCtxProvider>
  </QueryClientProvider>
)
