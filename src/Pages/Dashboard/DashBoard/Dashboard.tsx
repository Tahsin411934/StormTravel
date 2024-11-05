import React from 'react'
import CalendarComponent from '../Calender/CalendarComponent'
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../../AuthProvider/AuthContext';
import UserComponent from './UserComponent';
const Dashboard :React.FC = () => {
    const {user} = useAuth()
  return (
    <div className='grid grid-cols-12 font-Montserrat'>
    <div className='col-span-8 pt-5 pl-3'>
      <h1 className='text-2xl font-bold'>Hello {user?.displayName}!</h1>
      <p className='text-base text-gray-600'>Welcome back. Edit or share information where need</p>
    </div>
    <div className='col-span-4 border-none' >
        <div className='shadow-2xl'>
            <UserComponent></UserComponent>
        </div>
        <CalendarComponent></CalendarComponent>
    </div>
    </div>
  )
}

export default Dashboard
