import React from "react";
import { useGetTrain } from "../../utils/useGetTrain";


const formatDateTime = (isoString: string, showTime: boolean = true): string => {
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


const TrainSchedule = () => {
    const { data, isLoading, error } = useGetTrain();

    // Ensure data is an array
    const trains = Array.isArray(data) ? data : [];

    if (isLoading) return <p className="text-center text-blue-500 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">Error loading data!</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold mb-6 text-gray-800">All Train Schedules</h1>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
                <table className="w-full border-collapse">
                    {/* Table Header */}
                    <thead className="bg-green-600 text-white uppercase text-sm">
                        <tr>
                            <th className="p-3">Train No</th>
                            <th className="p-3">Train Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">From</th>
                            <th className="p-3">To</th>
                            <th className="p-3">Departure</th>
                            <th className="p-3">Arrival</th>
                            <th className="p-3">Shovon Chair</th>
                            <th className="p-3">First Class Chair</th>
                            <th className="p-3">First Class</th>
                            <th className="p-3">AC</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {trains.length > 0 ? (
                            trains.map((train, index) => (
                                <tr
                                    key={train.trainNumber}
                                    className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                                >
                                    <td className="p-3 font-semibold">{train.trainNumber}</td>
                                    <td className="p-3">{train.trainName}</td>
                                    <td className="p-3">{train.type}</td>
                                    <td className="p-3">{train.from}</td>
                                    <td className="p-3">{train.to}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(train.departureTime)}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(train.arrivalTime)}</td>
                                    <td className="p-3 font-bold text-blue-600">{train.Shovon_chair}</td>
                                    <td className="p-3 font-bold text-blue-600">{train.First_class_chair}</td>
                                    <td className="p-3 font-bold text-blue-600">{train.First_class}</td>
                                    <td className="p-3 font-bold text-blue-600">{train.AC}</td>
                                    <td className="p-3 text-green-600 font-semibold">${train.price}</td>
                                    <td className="p-3 font-medium text-gray-900">{formatDateTime(train.date, false)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={13} className="text-center p-4 text-gray-500">
                                    No trains available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainSchedule;
