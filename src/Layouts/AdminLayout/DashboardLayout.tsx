import React from 'react'
import Sidebar from '../../Pages/Dashboard/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout: React.FC = () => {
  return (
    <div className='grid grid-cols-10'>
      <div className='col-span-2  '>
        <Sidebar></Sidebar>
      </div>
      <div className='col-span-8 '>
        {/* <div className='w-full h-16 shadow-2xl border-b border-gray-300'></div> */}
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default DashboardLayout
