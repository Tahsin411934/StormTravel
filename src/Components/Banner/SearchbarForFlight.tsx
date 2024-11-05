import React from "react";
import { useForm } from "react-hook-form";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineUpdate } from "react-icons/md";

type FormData = {
  from: string;
  to: string;
  tripType: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  selectedClass: string;
};

const SearchBar: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Trip Type Selection */}
        <div className="mb-4 flex space-x-2">
          <label className={`p-2 rounded-md ${watch("tripType") === "oneway" ? "bg-blue-500 text-white" : "bg-blue-100"}`}>
            <input
              type="radio"
              value="oneway"
              {...register("tripType")}
              className="mr-2"
            />
            One-way
          </label>
          <label className={`p-2 rounded-md ${watch("tripType") === "round" ? "bg-blue-500 text-white" : "bg-blue-100"}`}>
            <input
              type="radio"
              value="round"
              {...register("tripType")}
              className="mr-2"
            />
            Round Trip
          </label>
        </div>

        <div className="md:flex items-center gap-4 w-full md:w-auto">
          {/* Class Selection */}
          <div className="mb-4 w-full md:w-auto">
            <select
              {...register("selectedClass")}
              className="border text-blue-800 text-semibold border-blue-100 p-2 rounded w-full"
            >
              <option value="economy">Economy Class</option>
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Traveler */}
          <div className="mb-4 w-full md:w-auto">
            <input
              type="number"
              {...register("travelers", { valueAsNumber: true, min: 1 })}
              className="border bg-blue-100 border-gray-300 p-2 rounded w-full"
              placeholder="1 traveler"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-2 md:gap-4 mb-4">
        {/* First City Selection */}
        <select
          {...register("from")}
          className="border border-gray-300 p-2 md:col-span-5 rounded bg-white"
        >
          <option value="" disabled>
            Select first city
          </option>
          <option value="dhaka">Dhaka</option>
          <option value="ctg">Chattogram</option>
          <option value="cox">Cox's Bazar</option>
          <option value="syl">Sylhet</option>
        </select>

        {/* Switch Icon */}
        <div className="flex items-center justify-center md:col-span-1">
          <GoArrowSwitch size={20} className="text-blue-500" />
        </div>

        {/* Second City Selection */}
        <select
          {...register("to")}
          className="border border-gray-300 p-2 md:col-span-5 rounded bg-white"
        >
          <option value="" disabled>
            Select second city
          </option>
          <option value="dhaka">Dhaka</option>
          <option value="ctg">Chattogram</option>
          <option value="cox">Cox's Bazar</option>
          <option value="syl">Sylhet</option>
        </select>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-2 md:gap-4 mb-4">
        <input
          type="date"
          {...register("departureDate")}
          className="border border-gray-300 p-2 md:col-span-5 rounded w-full"
        />

        {/* Switch Icon */}
        <div className="flex items-center justify-center md:col-span-1">
          <MdOutlineUpdate size={20} className="text-blue-500" />
        </div>

        <input
          type="date"
          {...register("returnDate")}
          className="border border-gray-300 md:col-span-5 p-2 rounded w-full"
          disabled={watch("tripType") === "oneway"}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
