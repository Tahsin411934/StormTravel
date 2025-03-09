import React from 'react';

const MostPopularAirlines: React.FC = () => {
  const airlines = [
    { name: 'Biman Bangladesh Airlines', logoUrl: 'biman-logo.png' },
    { name: 'US-Bangla Airlines', logoUrl: 'us-bangla-logo.jpeg' },
    { name: 'NOVOAIR', logoUrl: 'novaair-logo.png' },
    { name: 'Air Astra', logoUrl: 'air-astra-logo.jpeg' },
    { name: 'Emirates', logoUrl: 'emirates-logo.png' },
    { name: 'Singapore Airlines', logoUrl: 'singapore-airlines-logo.png' },
    { name: 'Turkish Airlines', logoUrl: 'turkish-airlines-logo.png' },
    { name: 'Qatar Airways', logoUrl: 'qatar-airways-logo.png' },
    { name: 'Malaysia Airlines', logoUrl: 'malaysia-airlines-logo.png' },
    { name: 'Vistara', logoUrl: 'vistara-logo.png' },
    { name: 'Etihad Airways', logoUrl: 'etihad-airways-logo.png' },
    
    { name: 'Maldivian', logoUrl: 'maldivian-logo.png' },
  ];

  return (
    <div className="most-popular-airlines p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">Most Popular Airlines</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Discover top airlines on StormTravel!and seamlessly search any flight and get any online ticket instantly, granting you effortless access to global travel.
      </p>
      <div className="airlines-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {airlines.map((airline, index) => (
          <div
            key={index}
            className="airline-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={airline.logoUrl}
              alt={airline.name}
              className="airline-logo w-24 h-24 object-contain mb-4"
            />
            <span className="airline-name text-center text-gray-700 font-medium">
              {airline.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularAirlines;