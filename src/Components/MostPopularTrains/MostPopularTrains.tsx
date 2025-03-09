import React from 'react';

const MostPopularTrains: React.FC = () => {
  const trains = [
    { name: 'Subarna Express', logoUrl: 'subarna-express-logo.jpeg' },
    { name: 'Mohanagar Express', logoUrl: 'mohanagar-express-logo.jpeg' },
    { name: 'Ekota Express', logoUrl: 'ekota-express-logo.jpeg' },
    { name: 'Tista Express', logoUrl: 'tista-express-logo.jpeg' },
   
  ];

  return (
    <div className="most-popular-trains p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">Most Popular Trains in Bangladesh</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Discover the most popular train services in Bangladesh on ShareTrip. Book your train tickets effortlessly and enjoy a comfortable journey across the country.
      </p>
      <div className="trains-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trains.map((train, index) => (
          <div
            key={index}
            className="train-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={train.logoUrl}
              alt={train.name}
              className="train-logo w-24 h-24 object-contain mb-4"
            />
            <span className="train-name text-center text-gray-700 font-medium">
              {train.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularTrains;