import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { axiosSecure } from "../../Hook/useAxiouSecure";

interface PackageDetails {
  name: string;
  price: number;
  discount: number; // Discount field added to interface
  duration: string;
  description: string;
  features: string;
  isActive: boolean;
  image: string;
}

const PackageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageDetails>();

  const [isActive, setIsActive] = useState<boolean>(true);

  const onSubmit = async (data: PackageDetails) => {
    const featuresArray = data.features.split(",").map((feature) => feature.trim());
    const packageData = { ...data, features: featuresArray, isActive };

    try {
      const res = await axiosSecure.post("http://localhost:5000/api/package", packageData);
      if (res.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Package added successfully.",
              confirmButtonText: "OK",
          });
          reset();
          setIsActive(true);
      }
  } catch (error: any) {
      console.log("Error Response:", error.response);
  
      // Check for a 400 status and handle the duplicate package error
      if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.msg || "Unknown error occurred.";
          
          Swal.fire({
              icon: "error",
              title: "Duplicate package name:",
              text: errorMessage,
              confirmButtonText: "OK",
          });
      } else {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong. Please try again.",
              confirmButtonText: "OK",
          });
      }
      console.error("Error adding package:", error);
  }
  
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-1 shadow-lg p-8 rounded-lg bg-white border border-blue-200">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#1C9FE1]">
        Add New Package
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Package Name</span>
            </label>
            <input
              type="text"
              placeholder="Package Name"
              className="input input-bordered w-full px-4 py-2"
              {...register("name", { required: "Package name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className="input input-bordered w-full px-4 py-2"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Discount</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Discount"
              className="input input-bordered w-full px-4 py-2"
              {...register("discount", { required: "Discount is required" })}
            />
            {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Duration</span>
            </label>
            <input
              type="text"
              placeholder="Duration (e.g., 1 month)"
              className="input input-bordered w-full px-4 py-2"
              {...register("duration", { required: "Duration is required" })}
            />
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
          </div>

          
        </div>
        <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full px-4 py-2"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text">Features (comma-separated)</span>
          </label>
          <input
            type="text"
            placeholder="Feature 1, Feature 2, Feature 3"
            className="input input-bordered w-full px-4 py-2"
            {...register("features", { required: "At least one feature is required" })}
          />
          {errors.features && <p className="text-red-500">{errors.features.message}</p>}
        </div>

        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Package Description"
            className="input input-bordered w-full px-4 py-2 h-24"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="form-control w-full mb-6 flex items-center">
          <label className="label cursor-pointer flex items-center gap-2">
            <span className="label-text">Is Active?</span>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive((prev) => !prev)}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn w-full sm:w-auto bg-[#1C9FE1] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1b8ecc] transition duration-200"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
