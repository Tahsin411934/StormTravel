import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

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
      const response = await fetch(`https://share-trip-serverv1.vercel.app/api/becomeTourGider/${id}`);
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
    <div className="  flex items-center justify-center bg-white  font-Montserrat">
      <div className=" max-w-[80%] p-6 my-10 w-full grid grid-cols-7 justify-start bg-gray-100 rounded-lg shadow-xl overflow-hidden">
        {/* Left side (Image) */}
        <div className="col-span-3  flex justify-center items-center">
          <img
            className="h-96 border-8 border-white shadow-xl transform  transition-all duration-300"
            src={tourGuide.image}
            alt={tourGuide.name}
          />
        </div>

        {/* Right side (Details) */}
        <div className="col-span-4 p-6 ">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold">{tourGuide.name}</h1>
            <p className="text-lg mt-2 text-gray-600">{tourGuide.certification}</p>
            <div className="text-center mt-1">
              <button
                className={`px-6 py-2 font-semibold text-white rounded-full ${tourGuide.isActive ? 'bg-blue-950 hover:bg-blue-800' : 'bg-red-500 hover:bg-red-600'
                  } transform transition-all duration-300`}
              >
                {tourGuide.isActive ? 'Currently Available' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
          <div className="text-lg text-gray-700">
            <p className="font-semibold text-indigo-950">About Me: <span className='text-gray-500 font-normal'>{tourGuide.aboutMe}</span></p>
            
          </div>
          <div className=" items-center text-lg text-gray-700">
            <div className="flex items-center space-x-3 mt-1">
              <span className="font-semibold text-indigo-950">Experience:</span>
              <span>{tourGuide.experience}</span>
            </div>

          </div>

          <div className="flex justify-between items-center gap-6 text-lg text-gray-700">
            <div className="flex items-center space-x-3 mt-1">
              <span className="font-semibold text-indigo-950">Contact:</span>
              <a href={`tel:${tourGuide.mobileNumber}`} className="text-indigo-950 hover:underline">
                {tourGuide.mobileNumber}
              </a>
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <span className="font-semibold text-indigo-950">Email:</span>
              <a href={`mailto:${tourGuide.email}`} className="text-indigo-950 hover:underline">
                {tourGuide.email}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-indigo-950 mt-1">Price per Tour:</span>
            <span>${tourGuide.price}</span>
          </div>


          <div className="text-center flex justify-end mt-6">
            <Link to={`/guider/booking/${tourGuide._id}`}
              className={`px-6 py-2 font-semibold text-white rounded-full ${tourGuide.isActive ? 'bg-blue-950 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                } transform transition-all duration-300`}
            >
              {tourGuide.isActive ? 'Book Now' : 'Currently Unavailable'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideDetails;
