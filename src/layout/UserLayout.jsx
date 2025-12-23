import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Pages/UserLayout/Header'

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default UserLayout
