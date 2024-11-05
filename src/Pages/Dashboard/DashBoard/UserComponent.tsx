import React from 'react'
import { useAuth } from '../../../AuthProvider/AuthContext'

const UserComponent = () => {
    const {user} = useAuth();
  return (
    <div>
      <div className="max-w-md mt-5 p-4 mb-5 w-[88%] sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
	
	<div className="flex flex-col  space-y-4">
		<div>
			<h2 className="text-2xl font-semibold">{user?.displayName}</h2>
			<span className="text-sm dark:text-gray-600">{user?.email}</span>
		</div>
		
	</div>
</div>
    </div>
  )
}

export default UserComponent
