import React from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../../Hook/useAxiouSecure";
import Swal from "sweetalert2"; 

interface TourGuide {
  name: string;
  mobileNumber: string;
  email: string;
  experience: string;
  certification: string;
  price: number;
  aboutMe: string;
  image: string;
  isActive: boolean;
}

const AddTourGuider = () => {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm<TourGuide>();

  const onSubmit = async (data: TourGuide) => {
    console.log(data);
    try {
      const res = await axiosSecure.post("http://localhost:5000/api/becomeTourGider/add", data);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Tour guide added successfully.',
          confirmButtonText: 'OK'
        });
        reset(); 
      }
    } catch (error) {
      console.error("Error adding tour guide:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      });
    }
    console.log(data);
  };

  return (
    <div className="w-[60%] mt-1 mx-auto shadow-lg p-5 border border-blue-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold text-center mb-6 text-[#1C9FE1]">
          Add New Tour Guide
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="input input-bordered"
              {...register("mobileNumber", { required: "Mobile number is required" })}
            />
            {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience</span>
          </label>
          <input
            type="text"
            placeholder="Experience"
            className="input input-bordered"
            {...register("experience", { required: "Experience is required" })}
          />
          {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Certification</span>
          </label>
          <input
            type="text"
            placeholder="Certification"
            className="input input-bordered"
            {...register("certification", { required: "Certification is required" })}
          />
          {errors.certification && <p className="text-red-500">{errors.certification.message}</p>}
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
            <span className="label-text">About Me</span>
          </label>
          <textarea
            placeholder="About Me"
            className="textarea textarea-bordered"
            {...register("aboutMe", { required: "About me is required" })}
          />
          {errors.aboutMe && <p className="text-red-500">{errors.aboutMe.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            placeholder="Image URL"
            className="input input-bordered"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Active</span>
          </label>
          <input
            type="checkbox"
            {...register("isActive")}
            className="checkbox"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn text-center bg-[#1C9FE1] text-gray-50 font-bold mt-4"
          >
            Add Tour Guide
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTourGuider;
