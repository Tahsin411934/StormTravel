import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrain } from '../../utils/useTrain';

export const TrainTicketBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useTrain(id!);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>;

  // Seat categories with abbreviations
  const seatCategories = [
    { name: 'SV (Shovon Chair)', abbreviation: 'SV', availableSeats: data?.Shovon_chair ?? 0 },
    { name: 'FCC (First Class Chair)', abbreviation: 'FCC', availableSeats: data?.First_class_chair ?? 0 },
    { name: 'First Class', abbreviation: 'FirstClass', availableSeats: data?.First_class ?? 0 },
    { name: 'AC', abbreviation: 'AC', availableSeats: data?.AC ?? 0 },
  ];

  // Handle seat selection
  const toggleSeatSelection = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Redirect to the booking confirmation page
  const handleConfirmBooking = () => {
    console.log(selectedSeats);
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before confirming your booking.');
      return; // Stop the function if no seats are selected
    }

    const totalPrice = selectedSeats.length * (data?.price ?? 0);

    navigate(`/train/booking/${id}`, {
      state: {
        trainName: data?.trainName,
        trainNumber: data?.trainNumber,
        from: data?.from,
        to: data?.to,
        pricePerSeat: data?.price,
        selectedSeats,
        totalSelectedSeats: selectedSeats.length,
        totalPrice,
      },
    });
  };

  // Render seats dynamically based on seat categories
  const renderSeats = (category: string, totalSeats: number, abbreviation: string) => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const seatNumber = `${abbreviation}-${i}`;
      const isSelected = selectedSeats.includes(seatNumber);

      seats.push(
        <button
          key={seatNumber}
          onClick={() => toggleSeatSelection(seatNumber)}
          className={`w-12 h-12 text-xs font-bold rounded-lg flex items-center justify-center transition-all duration-200
            ${isSelected ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' : 'bg-green-500 hover:bg-green-600 text-white shadow-md'}`}
        >
          {seatNumber}
        </button>
      );
    }
    return seats;
  };

  return (
    <div className="px-8 py-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="w-[87%] grid grid-cols-5 gap-6 mx-auto">
        {/* Seat Plan Section */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Select Your Seats</h2>

          {/* Seat selection guideline */}
          <div className="mb-4 text-sm text-gray-700 italic">
            <p>
              <strong>Guideline:</strong> Click on a seat to select it. The selected seats will be highlighted in blue.
            </p>
          </div>

          {seatCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-4">
                {renderSeats(category.name, category.availableSeats, category.abbreviation)}
              </div>
            </div>
          ))}

          {/* Selected Seats */}
          <p className="mt-6 text-lg font-medium text-gray-700">
            Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </p>
        </div>

        {/* Price Details */}
        <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Price Details</h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg font-medium text-center">
              <span className="font-bold text-blue-950">
                {data?.from} - {data?.to}
              </span>
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Train Name:</span> {data?.trainName}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Train Number:</span> {data?.trainNumber}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Price per seat:</span> {data?.price} BDT
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Total Seats Selected:</span> {selectedSeats.length}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Total Price: {selectedSeats.length * (data?.price ?? 0)} BDT
            </p>
          </div>
          <button
            onClick={handleConfirmBooking}
            className="mt-6 w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
            
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};
