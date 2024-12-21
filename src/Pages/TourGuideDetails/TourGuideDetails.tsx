import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface TourGuide {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  experience: string;
  certification: string;
  price: number;
  aboutMe: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const TourGuideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL

  // Fetch the tour guide data using React Query
  const { data: tourGuide, isLoading, error } = useQuery<TourGuide>({
    queryKey: ['TourGuide', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/becomeTourGider/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tour guide');
      }
      return response.json();
    },
    enabled: !!id, // This ensures the query runs only when `id` is available
  });

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // If no tour guide data is found, return a message
  if (!tourGuide) return <div>No tour guide data found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white max-w-5xl w-full flex rounded-lg shadow-xl overflow-hidden">
        {/* Left side (Image) */}
        <div className="w-1/2 p-6 flex justify-center items-center">
          <img
            className="h-64 w-64 rounded-full border-8 border-white shadow-xl transform hover:scale-110 transition-all duration-300"
            src={tourGuide.image}
            alt={tourGuide.name}
          />
        </div>

        {/* Right side (Details) */}
        <div className="w-1/2 p-6 space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold">{tourGuide.name}</h1>
            <p className="text-lg mt-2 text-gray-600">{tourGuide.certification}</p>
          </div>

          <div className="flex justify-between items-center text-lg text-gray-700">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-indigo-600">Experience:</span>
              <span>{tourGuide.experience}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-indigo-600">Price per Tour:</span>
              <span>${tourGuide.price}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg text-gray-700">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-indigo-600">Contact:</span>
              <a href={`tel:${tourGuide.mobileNumber}`} className="text-indigo-600 hover:underline">
                {tourGuide.mobileNumber}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-indigo-600">Email:</span>
              <a href={`mailto:${tourGuide.email}`} className="text-indigo-600 hover:underline">
                {tourGuide.email}
              </a>
            </div>
          </div>

          <div className="text-lg text-gray-700">
            <p className="font-semibold text-indigo-600">About Me:</p>
            <p>{tourGuide.aboutMe}</p>
          </div>

          <div className="text-center mt-6">
            <button
              className={`px-6 py-2 font-semibold text-white rounded-full ${
                tourGuide.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              } transform transition-all duration-300`}
            >
              {tourGuide.isActive ? 'Currently Available' : 'Currently Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideDetails;
