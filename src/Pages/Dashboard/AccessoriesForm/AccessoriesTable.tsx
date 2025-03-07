import React from 'react'
import { useGetAccessories } from '../../../utils/useGetAccessories'

function AccessoriesTable() {

  const {data, isLoading, error} = useGetAccessories()
 

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Packages</h1>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-gray-300 text-blue-950">
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Description</th>
              <th>isAvailable</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data?.map((pkg) => (
              <tr key={pkg._id} className="hover:bg-base-200">
                <td>
                  <img src={pkg.imgUrl} alt={pkg.imgUrl} className="h-16 w-16 object-cover rounded-md" loading="lazy" />
                </td>
                <td className="font-bold">{pkg.productName}</td>
                <td className="text-success">${pkg.price.toFixed(2)}</td>
                <td className="text-error">{pkg.discount}%</td>
                <td>{pkg.category}</td>
                <td className="truncate max-w-[150px]">{pkg.description}</td>
                <td>{pkg.available}</td>
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

export default AccessoriesTable