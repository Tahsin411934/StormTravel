import React from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../../Hook/useAxiouSecure";
import Swal from "sweetalert2";

interface TrainSchedule {
  trainNumber: string;
  trainName: string;
  type: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  Shovon_chair: number;
  First_class_chair: number;
  First_class: number;
  AC: number;
  price: number;
  date: string;
}

const AddTrainSchedule: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrainSchedule>();

  const onSubmit = async (data: TrainSchedule) => {
    try {
      const res = await axiosSecure.post("http://localhost:5000/api/train-schedule", data);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Train schedule added successfully.",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding train schedule:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
    console.log(data);
  };

  return (
    <div className="w-[60%] mt-1 mx-auto shadow-lg p-5 border border-blue-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold text-center mb-6 text-[#1C9FE1]">
          Add New Train Schedule
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Train Number</span>
          </label>
          <input
            type="text"
            placeholder="Train Number"
            className="input input-bordered"
            {...register("trainNumber", { required: "Train number is required" })}
          />
          {errors.trainNumber && <p className="text-red-500">{errors.trainNumber.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Train Name</span>
          </label>
          <input
            type="text"
            placeholder="Train Name"
            className="input input-bordered"
            {...register("trainName", { required: "Train name is required" })}
          />
          {errors.trainName && <p className="text-red-500">{errors.trainName.message}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="train-type">
            <span className="label-text">Type</span>
          </label>
          <select
            id="train-type"
            className="input input-bordered"
            {...register("type", { required: "Train type is required" })}
          >
            <option value="">Select Type (Intercity/Local)</option>
            <option value="Intercity">Intercity</option>
            <option value="Local">Local</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <input
              type="text"
              placeholder="Departure Location"
              className="input input-bordered"
              {...register("from", { required: "Departure location is required" })}
            />
            {errors.from && <p className="text-red-500">{errors.from.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">To</span>
            </label>
            <input
              type="text"
              placeholder="Destination"
              className="input input-bordered"
              {...register("to", { required: "Destination is required" })}
            />
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Seats (Shovon Chair)</span>
          </label>
          <input
            type="number"
            placeholder="Shovon Chair Seats"
            className="input input-bordered"
            {...register("Shovon_chair", { required: "Shovon Chair seats are required" })}
          />
          {errors.Shovon_chair && <p className="text-red-500">{errors.Shovon_chair.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Seats (First Class Chair)</span>
          </label>
          <input
            type="number"
            placeholder="First Class Chair Seats"
            className="input input-bordered"
            {...register("First_class_chair", { required: "First Class Chair seats are required" })}
          />
          {errors.First_class_chair && (
            <p className="text-red-500">{errors.First_class_chair.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Seats (First Class)</span>
          </label>
          <input
            type="number"
            placeholder="First Class Seats"
            className="input input-bordered"
            {...register("First_class", { required: "First Class seats are required" })}
          />
          {errors.First_class && <p className="text-red-500">{errors.First_class.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Seats (AC)</span>
          </label>
          <input
            type="number"
            placeholder="AC Seats"
            className="input input-bordered"
            {...register("AC", { required: "AC seats are required" })}
          />
          {errors.AC && <p className="text-red-500">{errors.AC.message}</p>}
        </div>

        <div className="form-control">
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
            Add Train Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainSchedule;
