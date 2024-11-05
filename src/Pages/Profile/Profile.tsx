import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import Swal from "sweetalert2"; // Import SweetAlert2

interface FormValues {
  name: string;
  email: string;
  mobileNumber: string;
  password: string; // Keep empty for security reasons
  role: string;
}

// Show success alert when the profile is updated
const showSuccessAlert = () => {
  Swal.fire({
    title: "<strong>Profile Updated!</strong>",
    html: "Your profile has been <b>successfully updated</b>.",
    icon: "success",
    confirmButtonText: "Awesome!",
    confirmButtonColor: "#3085d6",
  });
};

// Show alert when trying to edit the email


const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState({
    name: false,
    mobileNumber: false,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await axiosSecure.put(`api/users/${data?._id}`, formData);
      showSuccessAlert();
      refetch(); // Refresh data
      setIsEditing({ name: false, mobileNumber: false }); // Disable editing mode
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    mobileNumber: data?.mobileNumber || "",
    password: "", // Keep empty for security reasons
    role: data?.role || "",
  };

  return (
    <div className="pt-16 font-Montserrat lg:w-[60%] mx-auto border border-blue-300 rounded-lg shadow-lg p-6 bg-white">
      <div className="avatar online placeholder mb-4">
        <div className="bg-neutral text-neutral-content w-16 rounded-full">
          <span className="text-xl">AI</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <div className="relative w-full">
            <input
              type="text"
              defaultValue={defaultValues.name}
              placeholder="Name"
              className="input input-bordered w-full pr-10"
              {...register("name")} // Removed required validation
              disabled={!isEditing.name}
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsEditing({ ...isEditing, name: !isEditing.name })}
            >
              {isEditing.name ? "💾" : "✎"}
            </span>
          </div>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Mobile Number Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile Number</span>
          </label>
          <div className="relative w-full">
            <input
              type="text"
              defaultValue={defaultValues.mobileNumber}
              placeholder="Mobile Number"
              className="input input-bordered w-full pr-10"
              {...register("mobileNumber")} // Removed required validation
              disabled={!isEditing.mobileNumber}
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsEditing({ ...isEditing, mobileNumber: !isEditing.mobileNumber })}
            >
              {isEditing.mobileNumber ? "💾" : "✎"}
            </span>
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500">{errors.mobileNumber.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            defaultValue={defaultValues.email}
            placeholder="Email"
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
          <p className="text-gray-500">Email cannot be edited</p>
        </div>

        <button type="submit" className="btn bg-[#1E1743] text-white mt-4 w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
