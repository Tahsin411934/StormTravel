import React from "react";
import { useForm } from "react-hook-form";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type FormData = {
  from: string;
  to: string;
  tripType: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  selectedClass: string;
};

const SearchBarForBus: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      tripType: "oneway", // Set default trip type to "oneway"
      selectedClass: "ac", // Set default class to "AC"
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Submitting form with data:", data);

    const from = data?.from || null;
    const to = data?.to || null;
    const departureTime = data?.departureDate || null;
    const returnDate = data?.returnDate || null;
    console.log(from);
    navigate(
      `/busSearchResult?from=${from}&to=${to}&departureTime=${departureTime}&returnDate=${returnDate}&travelers=${data.travelers}&class=${data.selectedClass}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 bg-white rounded-lg shadow-md">
      {/* Trip Type Selection */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex space-x-2 mb-4 md:mb-0">
          <label
            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
              watch("tripType") === "oneway"
                ? "bg-blue-900 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              value="oneway"
              {...register("tripType")}
              className="mr-2"
            />
            One-way
          </label>
          <label
            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
              watch("tripType") === "round"
                ? "bg-blue-900 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              value="round"
              {...register("tripType")}
              className="mr-2"
            />
            Round Trip
          </label>
        </div>

        {/* Travelers and Class Selection */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            {...register("selectedClass")}
            className="border text-blue-900 font-semibold border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          >
            <option value="ac">AC</option>
            <option value="non-ac">Non-AC</option>
          </select>

          <input
            type="number"
            {...register("travelers", { valueAsNumber: true, min: 1 })}
            className="border bg-gray-100 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            placeholder="1 traveler"
          />
        </div>
      </div>

      {/* City and Date Selection in One Line */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Departure City */}
        <select
          {...register("from")}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Departure City
          </option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="cox">Cox's Bazar</option>
          <option value="Sylhet">Sylhet</option>
        </select>

        {/* Destination City */}
        <select
          {...register("to")}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Destination City
          </option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="cox">Cox's Bazar</option>
          <option value="Sylhet">Sylhet</option>
        </select>

        {/* Departure Date */}
        <input
          type="date"
          {...register("departureDate")}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Return Date */}
        <input
          type="date"
          {...register("returnDate")}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={watch("tripType") === "oneway"}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-900 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-800 transition-colors duration-200"
      >
        Search Buses
      </button>
    </form>
  );
};

export default SearchBarForBus;