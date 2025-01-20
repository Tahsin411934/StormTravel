import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import BuyTicket from "../../Components/Searchbar/BuyTicket";

const flightNames = [
    "Biman Bangladesh Airlines",
    "US-Bangla Airlines",
    "Novoair",
    "Regent Airways",
    "Air Astra"
];

const flightClasses = ["Economy", "Business", "First"];

const Flight: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const from = queryParams.get("from");
    const to = queryParams.get("to");
    const departureTime = queryParams.get("departureTime");
    const returnDate = queryParams.get("returnDate");

    const [departureData, setDepartureData] = useState<any[]>([]);
    const [returnData, setReturnData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReturnLoading, setIsReturnLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [returnError, setReturnError] = useState<string | null>(null);

    const [selectedFlightName, setSelectedFlightName] = useState("");
    const [selectedFlightClass, setSelectedFlightClass] = useState("");

    useEffect(() => {
        // Reset previous data on query change
        setDepartureData([]);
        setReturnData([]);
        setError(null);
        setReturnError(null);

        const fetchDepartureData = async () => {
            setIsLoading(true);
            try {
                const res = await axiosSecure.get(
                    `/api/flight/by-date?date=${departureTime}&from=${from}&to=${to}`
                );
                if (res.status === 400) {
                    setError("Flight not found");
                } else {
                    setDepartureData(res.data);
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Error fetching departure data"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (departureTime && from && to) {
            fetchDepartureData();
        } else {
            setIsLoading(false);
        }
    }, [departureTime, from, to]);

    useEffect(() => {
        
        if (returnDate) {
            const fetchReturnData = async () => {
                setIsReturnLoading(true);
                try {
                    const res = await axiosSecure.get(
                        `/api/flight/by-date?date=${returnDate}&from=${to}&to=${from}`
                    );
                    if (res.status === 400) {
                        setReturnError("Flight not found");
                    } else {
                        setReturnData(res.data);
                    }
                } catch (err) {
                    setReturnError(
                        err instanceof Error ? err.message : "Error fetching return data"
                    );
                } finally {
                    setIsReturnLoading(false);
                }
            };
            fetchReturnData();
        } else {
            setIsReturnLoading(false);
        }
    }, [returnDate, from, to]);

    const filteredDepartureData = departureData.filter(
        (flight) =>
            (selectedFlightName ? flight.flightName === selectedFlightName : true) &&
            (selectedFlightClass ? flight.class === selectedFlightClass : true)
    );

    const filteredReturnData = returnData.filter(
        (flight) =>
            (selectedFlightName ? flight.flightName === selectedFlightName : true) &&
            (selectedFlightClass ? flight.class === selectedFlightClass : true)
    );

    const renderFlightCard = (flight: any) => (
        <div
            key={flight.flightNumber}
            className="bg-gradient-to-r font-Poppins from-blue-50 to-blue-100 shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl "
        >
            <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row gap-20 items-start md:items-center">
                <div>
                    <div className="text-blue-900 text-xl font-semibold">
                        {flight.flightName}
                    </div>
                    <div className="text-blue-600 text-base font-bold">
                        {flight.class} Class
                    </div>
                    <div className="text-gray-700 text-sm">
                        Flight Number: <span className="font-medium">{flight.flightNumber}</span>
                    </div>
                </div>

                <div className="text-gray-800 text-base leading-relaxed flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wide">Route:</span>
                    <span className="italic text-gray-600">{from}</span>
                    <span className="text-lg font-semibold text-blue-500">➔</span>
                    <span className="italic text-gray-600">{to}</span>
                </div>

                <div className="text-gray-800 text-base">
                    <span className="font-semibold">Seats Available:</span> {flight.seatsAvailable}
                </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
                <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Departure:</span>{" "}
                    {new Date(flight.departureTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Arrival:</span>{" "}
                    {new Date(flight.arrivalTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <p className="text-green-950 font-semibold text-xl mt-2 mb-2">Price: ${flight.price}</p>
                <div className="py-3">
                <Link to={`/flight/${flight._id}`}  className="w-full mt-5 bg-blue-950 text-white font-semibold p-2 rounded-lg hover:bg-blue-900 ">
                    Book Now
                </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <BuyTicket />
            <div className="grid grid-cols-12 gap-6 px-6">
                <div className="col-span-12 md:col-span-3 lg:col-span-2 shadow-lg p-4  bg-white space-y-8">
                    {/* Filters */}
                    <div className="space-y-4  ">
                        <h1 className="font-bold text-xl text-blue-950">Filter By: </h1>
                        <hr />
                        <div className="flex flex-col space-y-2">
                            <p className="font-semibold">FLIGHT NAME:</p>
                            {flightNames.map((name) => (
                                <label key={name} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="flightName"
                                        value={name}
                                        className="form-radio text-blue-500"
                                        checked={selectedFlightName === name}
                                        onChange={() => setSelectedFlightName(name)}
                                    />
                                    <span className="ml-2">{name}</span>
                                </label>
                            ))}
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="flightName"
                                    value=""
                                    className="form-radio text-blue-500"
                                    checked={selectedFlightName === ""}
                                    onChange={() => setSelectedFlightName("")}
                                />
                                <span className="ml-2">All Flights</span>
                            </label>
                        </div>
                        <hr />
                        <div className="flex flex-col space-y-2">
                            <p className="font-semibold">FLIGHT CLASS:</p>
                            {flightClasses.map((className) => (
                                <label key={className} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="class"
                                        value={className}
                                        className="form-radio text-blue-500"
                                        checked={selectedFlightClass === className}
                                        onChange={() => setSelectedFlightClass(className)}
                                    />
                                    <span className="ml-2">{className}</span>
                                </label>
                            ))}
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value=""
                                    className="form-radio text-blue-500"
                                    checked={selectedFlightClass === ""}
                                    onChange={() => setSelectedFlightClass("")}
                                />
                                <span className="ml-2">All Classes</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-9 lg:col-span-10 pt-5">
                    {/* Departure Data */}
                    <div className="mb-10">
                        <h3 className="text-xl font-Montserrat font-semibold mb-6">Departure Flight Schedule : </h3>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : filteredDepartureData.length > 0 ? (
                            <div className="space-y-4">{filteredDepartureData.map(renderFlightCard)}</div>
                        ) : (
                            <p>No departure data available.</p>
                        )}
                    </div>
                    <hr className="bg-blue-950 p-1" />
                    {/* Return Data */}
                    {returnDate && (
                        <div>
                            <h3 className="text-xl font-Montserrat font-semibold pt-5 mb-6">Return Flight Schedule :</h3>
                            {isReturnLoading ? (
                                <div>Loading...</div>
                            ) : filteredReturnData.length > 0 ? (
                                <div className="space-y-4">{filteredReturnData.map(renderFlightCard)}</div>
                            ) : (
                                <p>No return data available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Flight;
