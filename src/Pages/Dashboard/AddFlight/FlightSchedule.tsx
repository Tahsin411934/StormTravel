import React from 'react';
import { useGetAllFlight } from '../../../utils/useGetAllFlight';

interface FlightSchedule {
    _id: string; // Unique identifier
    flightNumber: string;
    flightName: string;
    flightClass: string; // Changed from 'class' to avoid conflict
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    seatsAvailable: number;
    price: number;
    date: string;
}

// Date Formatting Function for departure and arrival time
const formatDateTime = (isoString: string, showTime: boolean = true) => {
    if (!isoString) return "N/A"; // Handle missing values

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid date

    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (showTime) {
        const formattedTime = date.toLocaleTimeString("en-BD", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return `${formattedDate}, ${formattedTime}`;
    }

    return formattedDate; // Show only date
};

const FlightSchedule: React.FC = () => {
    const { data, isLoading, error } = useGetAllFlight();

    // Ensure data is an array
    const flights: FlightSchedule[] = Array.isArray(data) ? data : [];

    if (isLoading) return <p className="text-center text-blue-500 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">Error loading data!</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold mb-6 text-gray-800">All Flight Schedules</h1>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
                <table className="w-full border-collapse">
                    {/* Table Header */}
                    <thead className="bg-blue-600 text-white uppercase text-sm">
                        <tr>
                            <th className="p-3">Flight No</th>
                            <th className="p-3">Flight Name</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">From</th>
                            <th className="p-3">To</th>
                            <th className="p-3">Departure</th>
                            <th className="p-3">Arrival</th>
                            <th className="p-3">Seats</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {flights.length > 0 ? (
                            flights.map((flight, index) => (
                                <tr key={flight._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                                    <td className="p-3 font-semibold">{flight.flightNumber}</td>
                                    <td className="p-3">{flight.flightName}</td>
                                    <td className="p-3">{flight.flightClass}</td>
                                    <td className="p-3">{flight.from}</td>
                                    <td className="p-3">{flight.to}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(flight.departureTime)}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(flight.arrivalTime)}</td>
                                    <td className="p-3 font-bold text-blue-600">{flight.seatsAvailable}</td>
                                    <td className="p-3 text-green-600 font-semibold">${flight.price}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(flight.date, false)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="text-center p-4 text-gray-500">
                                    No flights available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightSchedule;
