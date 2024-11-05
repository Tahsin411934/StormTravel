import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiouSecure";

const busNames = ["Express Line", "City Rider", "GreenLine", "Sky Travels", "BlueLine"];
const classes = ["AC", "Non AC"];

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
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
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
      (selectedClass ? bus.class === selectedClass : true)
  );

  const filteredReturnData = returnData.filter(
    (bus) =>
      (selectedBusName ? bus.busName === selectedBusName : true) &&
      (selectedClass ? bus.class === selectedClass : true)
  );

  const renderBusCard = (bus: any) => (
    <div
      key={bus.busNumber}
      className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 space-y-4 transition-transform transform hover:scale-105"
    >
      <h4 className="text-lg font-bold text-blue-600">
        {bus.class} - {bus.busName}
      </h4>
      <p className="text-sm text-gray-500">Bus Number: {bus.busNumber}</p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(bus.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Route:</span> {from} ➔ {to}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Seats Available:</span>{" "}
        {bus.availableSeats}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Departure:</span>{" "}
        {new Date(bus.departureTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Arrival:</span>{" "}
        {new Date(bus.arrivalTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-green-500 font-semibold">Price: ${bus.price}</p>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12 md:col-span-3 lg:col-span-2 shadow-lg p-4 rounded-lg bg-white space-y-8">
        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="font-semibold">Bus Name:</p>
            {busNames.map((name) => (
              <label key={name} className="inline-flex items-center">
                <input
                  type="radio"
                  name="busName"
                  value={name}
                  className="form-radio text-blue-500"
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
                className="form-radio text-blue-500"
                checked={selectedBusName === ""}
                onChange={() => setSelectedBusName("")}
              />
              <span className="ml-2">All Bus Names</span>
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="font-semibold">Class:</p>
            {classes.map((className) => (
              <label key={className} className="inline-flex items-center">
                <input
                  type="radio"
                  name="class"
                  value={className}
                  className="form-radio text-blue-500"
                  checked={selectedClass === className}
                  onChange={() => setSelectedClass(className)}
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
                checked={selectedClass === ""}
                onChange={() => setSelectedClass("")}
              />
              <span className="ml-2">All Classes</span>
            </label>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        {/* Departure Data */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">Departure Bus Schedule</h3>
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredDepartureData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartureData.map(renderBusCard)}
            </div>
          ) : (
            <p>No departure data available.</p>
          )}
        </div>

        {/* Return Data */}
        {returnDate && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Return Bus Schedule</h3>
            {isReturnLoading ? (
              <div>Loading...</div>
            ) : filteredReturnData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReturnData.map(renderBusCard)}
              </div>
            ) : (
              <p>No return data available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bus;
