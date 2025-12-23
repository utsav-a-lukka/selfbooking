import React from 'react'
import Sidebar from '../Pages/AdminLayout/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
      <>
          <div className="flex">
              <div className="w-1/4">
                  <Sidebar />
              </div>
              <div className="w-full">
                  <Outlet />
              </div>
          </div>
      </>
  )
}

export default AdminLayout
