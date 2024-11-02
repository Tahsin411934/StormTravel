import React from 'react'
import ProfileSidebar from '../../Pages/Profile/ProfileSidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayoyt : React.FC = () => {
  return (
    <div className='grid grid-cols-10 '>
      <div className='col-span-2'>
        <ProfileSidebar></ProfileSidebar>
      </div>
      <div  className='col-span-8 text-center'>

        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ProfileLayoyt
