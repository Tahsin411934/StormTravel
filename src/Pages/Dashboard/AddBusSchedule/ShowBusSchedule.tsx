import React from 'react';
import { useGetAllBus } from '../../../utils/useGetAllBus';

interface Bus {
    _id: string;
    busNumber: string;
    busName: string;
    class: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    seatsAvailable: number;
    price: number;
    date: string;
    image: string;
}

// Date Formatting Function for departure and arrival time
const formatDateTime = (isoString: string, showTime: boolean = true) => {
    const date = new Date(isoString);

    // Date format: 17 January 2025
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (showTime) {
        // Time format in Bangladesh Timezone
        const formattedTime = date.toLocaleTimeString("en-BD", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return `${formattedDate}, ${formattedTime}`;
    }

    // For the 'date' field, show date only
    return formattedDate;
};

const ShowBusSchedule: React.FC = () => {
    const { data, isLoading, error } = useGetAllBus();

    // ✅ Ensure data is an array
    const buses: Bus[] = Array.isArray(data) ? data : [];

    if (isLoading) return <p className="text-center text-blue-500 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">Error loading data!</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold mb-6  text-gray-800">All Bus Schedules</h1>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
                <table className="w-full border-collapse">
                    {/* Table Header */}
                    <thead className="bg-gray-600 text-white uppercase text-sm">
                        <tr>
                            <th className="p-3">Bus No</th>
                            <th className="p-3">Bus Name</th>
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
                        {buses.map((bus, index) => (
                            <tr key={bus._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                                <td className="p-3 font-semibold">{bus.busNumber}</td>
                                <td className="p-3">{bus.busName}</td>
                                <td className="p-3">{bus.class}</td>
                                <td className="p-3">{bus.from}</td>
                                <td className="p-3">{bus.to}</td>
                                <td className="p-3 font-medium text-gray-900">{formatDateTime(bus.departureTime)}</td>
                                <td className="p-3 font-medium text-gray-900">{formatDateTime(bus.arrivalTime)}</td>
                                <td className="p-3 font-bold text-blue-600">{bus.seatsAvailable}</td>
                                <td className="p-3 text-green-600 font-semibold">${bus.price}</td>
                                <td className="p-3 font-medium text-gray-900">{formatDateTime(bus.date, false)}</td> {/* Show only date */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowBusSchedule;
