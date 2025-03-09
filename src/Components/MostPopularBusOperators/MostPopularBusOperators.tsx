import React from 'react';

const MostPopularBusOperators: React.FC = () => {
  const busOperators = [
    { name: 'GreenLine Paribahan', logoUrl: 'greenline-logo.jpeg' },
    { name: 'Shohagh Paribahan', logoUrl: 'shohagh-logo.jpeg' },
    { name: 'Hanif Paribahan', logoUrl: 'hanif-logo.jpeg' },
    { name: 'Ena Paribahan', logoUrl: 'ena-logo.jpeg' },
    { name: 'Soudia Paribahan', logoUrl: 'soudia-logo.jpeg' },
    { name: 'Nabil Paribahan', logoUrl: 'nabil-logo.jpeg' },
    { name: 'Desh Travels', logoUrl: 'desh-travels-logo.jpeg' },
    { name: 'Eagle Paribahan', logoUrl: 'eagle-paribahan-logo.jpeg' },
   
  ];

  return (
    <div className="most-popular-bus-operators p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">Most Popular Bus Operators</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Discover top bus operators on StormTravel!and seamlessly search any bus route and get your tickets instantly, granting you effortless access to travel across the country.
      </p>
      <div className="bus-operators-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {busOperators.map((operator, index) => (
          <div
            key={index}
            className="bus-operator-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={operator.logoUrl}
              alt={operator.name}
              className="bus-operator-logo w-24 h-24 object-contain mb-4"
            />
            <span className="bus-operator-name text-center text-gray-700 font-medium">
              {operator.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularBusOperators;