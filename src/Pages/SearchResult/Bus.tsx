import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import SearchBarForBus from "../../Components/Banner/SearchbarForFlight";
import SearchBarForTrain from "../../Components/Banner/SearchbarForTrain";
import BuyTicket from "../../Components/Searchbar/BuyTicket";

const busNames = [
    "Green Line",
    "Shyamoli Paribahan",
    "Ena Transport",
    "Hanif Enterprise",
    "Desh Travels",
    "City Rider"
];

const busClasses = ["AC", "Non AC", "VIP"];

const Bus: React.FC = () => {
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

    const [selectedBusName, setSelectedBusName] = useState("");
    const [selectedBusClass, setSelectedBusClass] = useState("");

    const [showMoreDeparture, setShowMoreDeparture] = useState(false);
    const [showMoreReturn, setShowMoreReturn] = useState(false);

    useEffect(() => {
        setDepartureData([]);
        setReturnData([]);
        setError(null);
        setReturnError(null);
        const fetchDepartureData = async () => {
            try {
                const res = await axiosSecure.get(
                    `/api/bus-schedule/by-date?date=${departureTime}&from=${from}&to=${to}`
                );
                res.status === 400
                    ? setError("Bus not found")
                    : setDepartureData(res.data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Error fetching departure data"
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchDepartureData();
    }, [departureTime, from, to]);

    useEffect(() => {
        if (returnDate) {
            const fetchReturnData = async () => {
                try {
                    const res = await axiosSecure.get(
                        `/api/bus-schedule/by-date?date=${returnDate}&from=${to}&to=${from}`
                    );
                    res.status === 400
                        ? setReturnError("Bus not found")
                        : setReturnData(res.data);
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
    }, [returnDate, to, from]);

    const filteredDepartureData = departureData.filter(
        (bus) =>
            (selectedBusName ? bus.busName === selectedBusName : true) &&
            (selectedBusClass ? bus.class === selectedBusClass : true)
    );

    const filteredReturnData = returnData.filter(
        (bus) =>
            (selectedBusName ? bus.busName === selectedBusName : true) &&
            (selectedBusClass ? bus.class === selectedBusClass : true)
    );

    const renderBusCard = (bus: any) => (
        <div>

            <div
                key={bus.busNumber}
                className="bg-gradient-to-r font-Poppins from-green-50 to-green-100 shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl "
            >
                <div className="space-y-2 mb-5 md:space-y-0 md:space-x-4 flex flex-col md:flex-row gap-20 items-start md:items-center">
                    <div>
                        <div className="text-green-900 text-lg font-bold">
                            {bus.busName}
                        </div>
                        <div className="text-green-600 text-lg font-bold">
                            {bus.class}
                        </div>
                        <div className="text-gray-600 text-sm">
                            Bus Number: <span className="font-medium">{bus.busNumber}</span>
                        </div>
                    </div>

                    <div className="text-gray-800 text-base leading-relaxed flex items-center gap-2">
                        <span className="font-bold uppercase tracking-wide">Route:</span>
                        <span className="italic text-gray-600">{from}</span>
                        <span className="text-lg font-semibold text-green-500">➔</span>
                        <span className="italic text-gray-600">{to}</span>
                    </div>

                    <div className="text-gray-600 text-sm">
                        <span className="font-semibold">Seats Available:</span> {bus.seatsAvailable}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Departure:</span>{" "}
                        {new Date(bus.departureTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Arrival:</span>{" "}
                        {new Date(bus.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    <p className="text-green-950 font-semibold text-xl mt-2 mb-3">Price: ${bus.price}</p>
                    <Link to={`/bus/${bus._id}`} className="w-full  bg-green-950 text-white font-semibold mt-5 p-2 rounded-lg hover:bg-green-700 ">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );

    const handleShowMoreDeparture = () => setShowMoreDeparture(!showMoreDeparture);
    const handleShowMoreReturn = () => setShowMoreReturn(!showMoreReturn);

    return (
        <div className="mt-3 w-[95%] mx-auto">
            <BuyTicket></BuyTicket>
            <div className="grid grid-cols-12 gap-6 px-1">

                <div className="col-span-12 md:col-span-3 lg:col-span-2 shadow-lg p-4  bg-white space-y-8">
                    {/* Filters */}
                    <h1 className="font-bold text-xl text-blue-950">Filter By: </h1>
                    <hr />
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <p className="font-semibold">BUS NAME:</p>
                            {busNames.map((name) => (
                                <label key={name} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="busName"
                                        value={name}
                                        className="form-radio text-green-500"
                                        checked={selectedBusName === name}
                                        onChange={() => setSelectedBusName(name)}
                                    />
                                    <span className="ml-2">{name}</span>
                                </label>
                            ))}
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="busName"
                                    value=""
                                    className="form-radio text-green-500"
                                    checked={selectedBusName === ""}
                                    onChange={() => setSelectedBusName("")}
                                />
                                <span className="ml-2">All Buses</span>
                            </label>
                        </div>
                        <hr />
                        <div className="flex flex-col space-y-2">
                            <p className="font-semibold">BUS CLASS:</p>
                            {busClasses.map((className) => (
                                <label key={className} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="class"
                                        value={className}
                                        className="form-radio text-green-500"
                                        checked={selectedBusClass === className}
                                        onChange={() => setSelectedBusClass(className)}
                                    />
                                    <span className="ml-2">{className}</span>
                                </label>
                            ))}
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value=""
                                    className="form-radio text-green-500"
                                    checked={selectedBusClass === ""}
                                    onChange={() => setSelectedBusClass("")}
                                />
                                <span className="ml-2">All Classes</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-9 lg:col-span-10 py-5">
                    {/* Departure Data */}

                    <div className="mb-10">
                        <h3 className="text-xl font-Montserrat font-semibold mb-6">Departure Bus Schedule</h3>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : filteredDepartureData.length > 0 ? (
                            <div className="space-y-4">
                                {filteredDepartureData.slice(0, showMoreDeparture ? filteredDepartureData.length : 5).map(renderBusCard)}
                                <button
                                    onClick={handleShowMoreDeparture}
                                    className="mt-4 text-green-600 font-semibold"
                                >
                                    {showMoreDeparture ? "Show Less" : "See More"}
                                </button>
                            </div>
                        ) : (
                            <p>No departure data available.</p>
                        )}
                    </div>
                    <hr className="bg-blue-950 p-1" />
                    {/* Return Data */}
                    {returnDate && (
                        <div>
                            <h3 className="text-xl font-Montserrat font-semibold mb-6 pt-5">Return Bus Schedule</h3>
                            {isReturnLoading ? (
                                <div>Loading...</div>
                            ) : filteredReturnData.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredReturnData.slice(0, showMoreReturn ? filteredReturnData.length : 5).map(renderBusCard)}
                                    <button
                                        onClick={handleShowMoreReturn}
                                        className="mt-4 text-green-600 font-semibold"
                                    >
                                        {showMoreReturn ? "Show Less" : "See More"}
                                    </button>
                                </div>
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

export default Bus;
