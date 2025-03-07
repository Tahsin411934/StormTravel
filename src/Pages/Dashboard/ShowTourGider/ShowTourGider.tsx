import React from 'react'
import { useTourGider } from '../../../utils/useTourGider'

const ShowTourGider = () => {
     const {data, isLoading, error} = useTourGider()
     return (
        <div className="p-6 bg-base-200 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">All TourGiders</h1>
    
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-gray-300 text-blue-950">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Certification</th>
                  <th>About</th>
                 
                </tr>
              </thead>
    
              {/* Table Body */}
              <tbody>
                {data?.map((gider) => (
                  <tr key={gider._id} className="hover:bg-base-200">
                    <td>
                      <img src={gider.image} alt={gider.image} className="h-16 w-16 object-cover rounded-md" loading="lazy" />
                    </td>
                    <td className="font-bold">{gider.name}</td>
                    <td className="text-success">${gider.experience}</td>
                    <td className="text-error">{gider.certification}</td>
                    <td>{gider.aboutMe}</td>
                    
                    <td>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
         
        </div>
      )
}

export default ShowTourGider
