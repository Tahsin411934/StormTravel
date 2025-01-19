import React from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../../Hook/useAxiouSecure";
import Swal from "sweetalert2"; // Import SweetAlert2

interface FlightSchedule {
  flightNumber: string;
  flightName: string;
  class: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  seatsAvailable: number;
  price: number;
  date: string;
}

const AddFlightSchedule: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlightSchedule>();

  const onSubmit = async (data: FlightSchedule) => {
    try {
      const res = await axiosSecure.post("http://localhost:5000/api/flight", data);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Flight schedule added successfully.",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding flight schedule:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-[60%] mt-1 mx-auto shadow-lg p-5 border border-blue-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold text-center mb-6 text-[#1C9FE1]">
          Add New Flight Schedule
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Flight Number</span>
          </label>
          <input
            type="text"
            placeholder="Flight Number"
            className="input input-bordered"
            {...register("flightNumber", { required: "Flight number is required" })}
          />
          {errors.flightNumber && <p className="text-red-500">{errors.flightNumber.message}</p>}
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Flight Name</span>
            </label>
            <input
              type="text"
              placeholder="Flight Name"
              className="input input-bordered"
              {...register("flightName", { required: "Flight name is required" })}
            />
            {errors.flightName && <p className="text-red-500">{errors.flightName.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="flight-class">
              <span className="label-text">Class</span>
            </label>
            <select
              id="flight-class"
              className="input input-bordered"
              {...register("class", { required: "Class is required" })}
            >
              <option value="">Select Class (Business/Economy)</option>
              <option value="Business">Business</option>
              <option value="Economy">Economy</option>
            </select>
            {errors.class && <p className="text-red-500">{errors.class.message}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <select
              {...register("from", { required: "Departure location is required" })}
              className="input input-bordered"
            >
              <option value="" disabled>
                Select departure city
              </option>
              <option value="Chattogram">Chattogram</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Cox'sbazar">Cox'sbazar</option>
            </select>
            {errors.from && <p className="text-red-500">{errors.from.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">To</span>
            </label>
            <select
              {...register("to", { required: "Destination is required" })}
              className="input input-bordered"
            >
              <option value="" disabled>
                Select destination city
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Cox'sbazar">Cox'sbazar</option>
            </select>
            {errors.to && <p className="text-red-500">{errors.to.message}</p>}
          </div>
        </div>

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

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn text-center bg-[#1C9FE1] text-gray-50 font-bold mt-4"
          >
            Add Flight Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlightSchedule;
