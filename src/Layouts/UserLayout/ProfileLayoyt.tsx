import React from 'react'
import ProfileSidebar from '../../Pages/Profile/ProfileSidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayoyt : React.FC = () => {
  return (
    <div className='grid grid-cols-10 max-w-[1400px]'>
      
      <div  className='col-span-10 text-center'>

        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ProfileLayoyt
