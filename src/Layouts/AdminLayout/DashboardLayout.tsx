import React from 'react'
import Sidebar from '../../Pages/Dashboard/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout: React.FC = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2 '>
        <Sidebar></Sidebar>
      </div>
      <div className='col-span-10 '>
        <div className='w-full h-16 shadow'></div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default DashboardLayout
