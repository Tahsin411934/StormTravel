import React from 'react';
import CalendarComponent from '../Calender/CalendarComponent';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../../AuthProvider/AuthContext';
import UserComponent from './UserComponent';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='grid grid-cols-12 gap-6 p-6 font-Montserrat bg-gray-100 min-h-screen'>
      {/* Main Content Section */}
      <div className='col-span-8'>
        {/* Welcome Section */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Hello {user?.displayName}!</h1>
          <p className='text-base text-gray-600 mt-2'>
            Welcome back. Edit or share information where needed.
          </p>
        </div>

        {/* Statistics or Quick Overview Section */}
        <div className='grid grid-cols-3 gap-6 mb-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-700'>Total Bookings</h2>
            <p className='text-2xl font-bold text-blue-600 mt-2'>1,234</p>
            <p className='text-sm text-gray-500'>+12% from last month</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-700'>Pending Requests</h2>
            <p className='text-2xl font-bold text-yellow-600 mt-2'>56</p>
            <p className='text-sm text-gray-500'>+5% from last month</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-700'>Revenue</h2>
            <p className='text-2xl font-bold text-green-600 mt-2'>$12,345</p>
            <p className='text-sm text-gray-500'>+18% from last month</p>
          </div>
        </div>

        {/* Recent Activities or Notifications Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Recent Activities</h2>
          <ul className='space-y-4'>
            <li className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-2 h-2 bg-blue-600 rounded-full mr-3'></div>
                <span className='text-gray-700'>New booking received</span>
              </div>
              <span className='text-sm text-gray-500'>2 hours ago</span>
            </li>
            <li className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-2 h-2 bg-green-600 rounded-full mr-3'></div>
                <span className='text-gray-700'>Payment received</span>
              </div>
              <span className='text-sm text-gray-500'>5 hours ago</span>
            </li>
            <li className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-2 h-2 bg-yellow-600 rounded-full mr-3'></div>
                <span className='text-gray-700'>Pending request updated</span>
              </div>
              <span className='text-sm text-gray-500'>1 day ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className='col-span-4'>
        {/* User Profile Section */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <UserComponent />
        </div>

        {/* Calendar Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;