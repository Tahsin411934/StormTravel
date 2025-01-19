import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBus } from '../../utils/useBus';

export const BusTicketBooking = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBus(id!);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>;

  const totalSeats = 40; // Total seats in the bus
  const activeSeats = data?.seatsAvailable ?? 0; // Available seats from the data
  const firstActiveSeat = totalSeats - activeSeats + 1; // Calculate the first active seat (e.g., for 13 seats, start from 28)

  // Handle seat selection
  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      // Allow deselecting the last selected seat only
      if (seatNumber === selectedSeats[selectedSeats.length - 1]) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      }
    } else if (
      selectedSeats.length < activeSeats &&
      (selectedSeats.length === 0 || seatNumber === selectedSeats[selectedSeats.length - 1] + 1)
    ) {
      // Only allow selecting the next seat serially
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Render seats dynamically
  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isActive = i >= firstActiveSeat; // Active seats start from the calculated firstActiveSeat
      const isSelected = selectedSeats.includes(i);

      seats.push(
        <button
          key={i}
          onClick={() => (isActive ? toggleSeatSelection(i) : null)}
          className={`w-12 h-12 text-sm font-bold rounded-lg flex items-center justify-center transition-all duration-200
            ${
              isSelected
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-105'
                : isActive
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!isActive || (selectedSeats.length > 0 && i > selectedSeats[selectedSeats.length - 1] + 1)}
        >
          {i}
        </button>
      );
    }

    // Format into rows with 4 seats per row and a 5px gap between the two groups
    const rows = [];
    for (let i = 0; i < totalSeats; i += 4) {
      rows.push(
        <div key={i} className="flex justify-between mb-2">
          <div className="flex space-x-6">{seats.slice(i, i + 2)}</div>
          <div className="flex space-x-6" style={{ marginLeft: '5px' }}>
            {seats.slice(i + 2, i + 4)}
          </div>
        </div>
      );
    }

    return rows;
  };

  return (
    <div className=" px-8 py-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className='w-[87%] grid grid-cols-5 gap-6 mx-auto'>
      {/* Seat Plan */}
      <div className=" col-span-2 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Select Your Seats</h2>

        {/* Guidelines */}
        

        {/* Render Seat Plan */}
        <div className="flex flex-col">{renderSeats()}</div>

        {/* Selected Seats */}
        <p className="mt-6 text-lg font-medium text-gray-700">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </p>
      </div>

      {/* Price Details */}
      <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
      <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-2">Guidelines:</h3>
          <ul className="list-disc list-inside">
            <li>Seats can only be booked from the last available seat (e.g., start from seat {totalSeats}).</li>
            <li>Seats must be selected serially without skipping any.</li>
            <li>You can deselect only the last selected seat.</li>
          </ul>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Price Details</h2>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg font-medium text-center">
            <span className=" font-bold text-blue-950"> {data?.from} - {data?.to} </span> 
          </p>
          <p className="text-lg font-medium">
            <span className="text-gray-600 font-bold">Bus Name:</span> {data?.busName} ({data?.class})
          </p>
          <p className="text-lg font-medium">
            <span className="text-gray-600 font-bold">Bus Number:</span> {data?.busNumber} 
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
          className="mt-6 w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
          disabled={selectedSeats.length === 0}
        >
          Confirm Booking
        </button>
      </div>
      </div>
    </div>
  );
};
