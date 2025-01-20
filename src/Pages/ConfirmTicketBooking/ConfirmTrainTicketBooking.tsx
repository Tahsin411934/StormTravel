import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const ConfirmTrainTicketBooking = () => {
  const { id } = useParams(); // Retrieve the train id from URL params
  const location = useLocation(); // Access the state passed during navigation

  // Destructure the state data
  const {
    trainName,
    trainNumber,
    from,
    to,
    pricePerSeat,
    selectedSeats,
    totalSelectedSeats,
    totalPrice,
  } = location.state || {}; // Use optional chaining in case state is undefined

  return (
    <div className="px-8 py-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="w-[87%] mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Confirmation</h2>

          <div className="space-y-4 text-gray-700">
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Train Name:</span> {trainName}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Train Number:</span> {trainNumber}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">From:</span> {from}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">To:</span> {to}
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Price per seat:</span> {pricePerSeat} BDT
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Total Seats Selected:</span> {totalSelectedSeats}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Total Price: {totalPrice} BDT
            </p>

            {/* Show selected seats */}
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Selected Seats:</span> {selectedSeats.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
