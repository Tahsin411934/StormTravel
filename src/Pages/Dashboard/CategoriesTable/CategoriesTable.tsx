import React, { useState } from 'react';
import { useGetCategories } from '../../../utils/useGetCtegories'; // Adjust the import path
import { axiosSecure } from '../../../Hook/useAxiouSecure'; // Adjust the import path
import { FaTrashAlt } from 'react-icons/fa';

const CategoriesTable = () => {
  const { data, isLoading, error, refetch } = useGetCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ category_name: '', description: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewCategory({ category_name: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosSecure.post('/api/categories', newCategory);
      refetch(); // Refresh the table data
      closeModal(); // Close the modal
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/categories/${id}`);
      refetch();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  

  if (isLoading) {
    return <div className="text-center py-4 text-lg font-semibold text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-lg font-semibold text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium">Category Name</label>
                <input
                  type="text"
                  name="category_name"
                  value={newCategory.category_name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md border bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">SN</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((category, index) => (
              <tr
                key={category._id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
              >
                <td className="px-6 py-4 text-gray-700">{index +1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{category.category_name}</td>
                <td className="px-6 py-4 text-gray-700">{category.description}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 flex items-center space-x-1"
                  >
                    <FaTrashAlt />
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;