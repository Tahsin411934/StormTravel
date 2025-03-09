import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2"; // Import SweetAlert2
import { useGetBus } from "../../../utils/useGetBus";
import { axiosSecure } from "../../../Hook/useAxiouSecure";

interface BusSchedule {
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
}

const AddBusSchedule: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusSchedule>();

  // Fetch bus data
  const { data: buses, isLoading, error } = useGetBus();

  const onSubmit = async (data: BusSchedule) => {
    try {
      const res = await axiosSecure.post("https://share-trip-serverv1.vercel.app/api/bus-schedule", data);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Bus schedule added successfully.',
          confirmButtonText: 'OK'
        });
        reset(); // Reset the form fields
      }
    } catch (error) {
      console.error("Error adding bus schedule:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4 text-lg font-semibold text-blue-500">Loading buses...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-lg font-semibold text-red-500">Error loading buses: {error.message}</div>;
  }

  return (
    <div className="w-[60%] mt-1 mx-auto shadow-lg p-5 border border-blue-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold text-center mb-6 text-[#1C9FE1]">
          Add New Bus Schedule
        </h2>

        {/* Bus Number Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bus Number</span>
          </label>
          <select
            className="input input-bordered"
            {...register("busNumber", { required: "Bus number is required" })}
          >
            <option value="" disabled>Select Bus Number</option>
            {buses?.map((bus) => (
              <option key={bus._id} value={bus.busNumber}>
                {bus.busNumber}
              </option>
            ))}
          </select>
          {errors.busNumber && <p className="text-red-500">{errors.busNumber.message}</p>}
        </div>

        {/* Bus Name Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bus Name</span>
          </label>
          <select
            className="input input-bordered"
            {...register("busName", { required: "Bus name is required" })}
          >
            <option value="" disabled>Select Bus Name</option>
            {buses?.map((bus) => (
              <option key={bus._id} value={bus.busName}>
                {bus.busName}
              </option>
            ))}
          </select>
          {errors.busName && <p className="text-red-500">{errors.busName.message}</p>}
        </div>

        {/* Class Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class</span>
          </label>
          <select
            className="input input-bordered"
            {...register("class", { required: "Class is required" })}
          >
            <option value="" disabled>Select Class (AC/Non-AC)</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
          {errors.class && <p className="text-red-500">{errors.class.message}</p>}
        </div>

        {/* From and To Dropdowns */}
        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <select
              className="input input-bordered"
              {...register("from", { required: "Departure location is required" })}
            >
              <option value="" disabled>Select departure city</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Sylhet">Sylhet</option>
              <option value="cox">Cox's Bazar</option>
            </select>
            {errors.from && <p className="text-red-500">{errors.from.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">To</span>
            </label>
            <select
              className="input input-bordered"
              {...register("to", { required: "Destination is required" })}
            >
              <option value="" disabled>Select destination city</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="cox">Cox's Bazar</option>
              <option value="Sylhet">Sylhet</option>
            </select>
            {errors.to && <p className="text-red-500">{errors.to.message}</p>}
          </div>
        </div>

        {/* Departure and Arrival Time */}
        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Departure Time</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              {...register("departureTime", { required: "Departure time is required" })}
            />
            {errors.departureTime && <p className="text-red-500">{errors.departureTime.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Arrival Time</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              {...register("arrivalTime", { required: "Arrival time is required" })}
            />
            {errors.arrivalTime && <p className="text-red-500">{errors.arrivalTime.message}</p>}
          </div>
        </div>

        {/* Seats Available and Price */}
        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Seats Available</span>
            </label>
            <input
              type="number"
              placeholder="Seats Available"
              className="input input-bordered"
              {...register("seatsAvailable", { required: "Number of seats available is required" })}
            />
            {errors.seatsAvailable && <p className="text-red-500">{errors.seatsAvailable.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn text-center bg-[#1C9FE1] text-gray-50 font-bold mt-4"
          >
            Add Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusSchedule;