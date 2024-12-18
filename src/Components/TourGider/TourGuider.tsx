import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTourGider } from '../../utils/useTourGider';

interface Guide {
  _id: string;
  name: string;
  image: string;
  experience:string;
}

export const TourGuider: React.FC = () => {
  const { data, isLoading, error } = useTourGider();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className='w-[90%] mx-auto'>
      <div className="pt-16 pb-6  text-4xl font-bold text-gray-800">
        Meet Our Tour Guides
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {data?.slice(0,4).map((guide) => (
          <div
            key={guide._id}
            className="flex flex-col items-center p-6 bg-white border border-gray-300 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              {guide.name}
            </h3>
            <p className="mt-2 text-gray-500 text-center">
             {guide.experience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
