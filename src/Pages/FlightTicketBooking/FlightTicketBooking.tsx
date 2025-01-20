import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFlight } from '../../utils/useFlight';


export const FlightTicketBooking = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFlight(id!);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>;

  const rows = 10; // Number of rows in the plane
  const seatsPerRow = 6; // Seats per row (e.g., A-F)
  const totalSeats = rows * seatsPerRow; // Total seats in the plane
  const activeSeats = data?.seatsAvailable ?? 0; // Available seats from the data
  const firstActiveSeat = totalSeats - activeSeats + 1; // Calculate the first active seat (e.g., for 13 seats, start from 58)

  // Handle seat selection
  const toggleSeatSelection = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      // Allow deselecting the last selected seat only
      if (seatNumber === selectedSeats[selectedSeats.length - 1]) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      }
    } else if (
      selectedSeats.length < activeSeats &&
      (selectedSeats.length === 0 || seatNumber === getNextSeat(selectedSeats[selectedSeats.length - 1]))
    ) {
      // Only allow selecting the next seat serially
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Generate seat numbers (e.g., 1A, 1B, ..., 10F)
  const generateSeatNumber = (row: number, col: number) => {
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return `${row}${seatLetters[col]}`;
  };

  // Get the next seat in the sequence
  const getNextSeat = (seat: string) => {
    const row = parseInt(seat.slice(0, -1));
    const col = seat.slice(-1);
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const colIndex = seatLetters.indexOf(col);

    if (colIndex < seatLetters.length - 1) return `${row}${seatLetters[colIndex + 1]}`;
    return `${row + 1}A`;
  };

  // Render seats dynamically
  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = generateSeatNumber(row, col);
        const seatIndex = (row - 1) * seatsPerRow + col + 1;
        const isActive = seatIndex >= firstActiveSeat; // Active seats start from the calculated firstActiveSeat
        const isSelected = selectedSeats.includes(seatNumber);

        rowSeats.push(
          <button
            key={seatNumber}
            onClick={() => (isActive ? toggleSeatSelection(seatNumber) : null)}
            className={`w-12 h-12 text-sm font-bold rounded-lg flex items-center justify-center transition-all duration-200
              ${
                isSelected
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-105'
                  : isActive
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!isActive || (selectedSeats.length > 0 && seatNumber !== getNextSeat(selectedSeats[selectedSeats.length - 1]))}
          >
            {seatNumber}
          </button>
        );
      }
      seats.push(
        <div key={row} className="flex justify-center space-x-4 mb-4">
          {rowSeats.slice(0, 3)}
          <div className="w-6"></div> {/* Gap between groups */}
          {rowSeats.slice(3)}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="px-8 py-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="w-[87%] grid grid-cols-5 gap-6 mx-auto">
        {/* Seat Plan */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
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
              <span className="font-bold text-blue-950">{data?.from} - {data?.to}</span>
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Flight Name:</span> {data?.flightName} ({data?.class})
            </p>
            <p className="text-lg font-medium">
              <span className="text-gray-600 font-bold">Flight Number:</span> {data?.flightNumber}
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
