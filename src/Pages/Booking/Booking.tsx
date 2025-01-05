import React, { useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { usePackageById } from '../../utils/usePackageById';
import { useForm } from "react-hook-form";
import { useAuth } from '../../AuthProvider/AuthContext';
import { axiosSecure } from '../../Hook/useAxiouSecure';

type FormData = {
  travelers: string;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
};

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = usePackageById(id!);
  const { user } = useAuth();
  const discount = data?.discount ?? 0;
  const price = data?.price ?? 0;
  const priceAfterDiscount = (price / 100) * (100 - discount);
  const [extras, setExtras] = useState({ premiumFood: false, refreshRoom: false });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    const extraCost = (extras.premiumFood ? 3000 : 0) + (extras.refreshRoom ? 1000 : 0);
    const totalPrice = priceAfterDiscount + extraCost;

    // Prepare the data to send
    const bookingData = {
      ...formData,
      extras,
      totalPrice
    };

    // Axios POST request
    axiosSecure.post('/api/booking/bookings', bookingData)
  .then((response) => {
    // Check if the _id exists in the response data
    const bookingId = response.data._id || response.data.data?._id;

    if (bookingId) {
      navigate(`/bookingConfirm/${id}`, { 
        state: { 
          bookingData, 
          id: bookingId 
        } 
      });
    } else {
      console.error('Booking ID not found in response data');
      alert("Unable to retrieve booking ID. Please try again.");
    }
  })
  .catch((error) => {
    console.error('Error submitting booking:', error);
    alert("Error submitting the form. Please try again.");
  });

  };

  return (
    <div className='bg-[#EBF0F4] '>
      <div className='w-[85%] mx-auto text-2xl p-5 font-semibold bg-white flex items-center gap-10 rounded-md mt-3 mb-2 text-[#00026E]'>
        <h1 className="">
          Review Your Booking :
        </h1>
        <h1>
          {data?.name}
        </h1>
      </div>

      <div className='grid grid-cols-3  w-[85%] pb-10  mx-auto gap-4'>
        <div className='col-span-2 rounded-xl flex flex-col justify-between h-full'>
          <div className="flex justify-center items-center  bg-gray-100 h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full p-6 bg-white rounded shadow-md h-full"
            >


              {/* Travelers */}
              <div className="mb-4">
                <label htmlFor="travelers" className="block  text-gray-700 mb-2">
                  Travelers
                </label>
                <input
                  type="text"
                  id="travelers"
                  value={user?.displayName || ''}
                  {...register("travelers", { required: "Travelers is required" })}
                  className={`form-control border w-full ${errors.travelers ? "border-red-500" : "border-gray-300"
                    } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E]`}
                  placeholder="Enter number of travelers"
                />
                {errors.travelers && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.travelers.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", { required: "Gender is required" })}
                  className={`form-control w-full border ${errors.gender ? "border-red-500" : "border-gray-300"
                    } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E]`}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>



              {/* Phone Number */}
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    id="countryCode"
                    defaultValue="+880"
                    className="form-control border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E]"
                  >
                    <option value="+880">Bangladesh (+880)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+1">USA (+1)</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: 'Invalid phone number format',
                      },
                    })}
                    className={`form-control flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E] ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-4">
                <label htmlFor="emailAddress" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  value={user?.email || ''}
                  {...register("emailAddress", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`form-control w-full border ${errors.emailAddress ? "border-red-500" : "border-gray-300"
                    } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E]`}
                  placeholder="Enter your email address"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#00026E] text-white rounded hover:bg-[#000070] transition"
              >
                Continue
              </button>
            </form>
          </div>
        </div>

        <div className='col-span-1 flex flex-col justify-between h-full'>
          <div className='bg-white p-6 rounded-xl h-full flex flex-col'>
            <div className='flex item-center gap-2 mb-3'>
              <img className='rounded-lg' src={data?.image} alt={data?.name} width={100} />
              <h1 className='text-xl font-semibold text-[#00026E]'>{data?.name}</h1>
            </div>
            <hr className='mb-4' />
            <div className='flex-1'>
              <h1 className='font-semibold text-[#00026E] text-base mb-4'>Fare Summary: </h1>
              <div className='flex items-center justify-between text-stone-600 mb-4'>
                <h3>Original Price</h3>
                <h3>{price} BDT</h3>
              </div>
              <div className='flex items-center justify-between text-stone-600 mb-4'>
                <h3>Discount</h3>
                <h3>{discount}%</h3>
              </div>
              <div className='flex items-center justify-between text-stone-600 mb-4'>
                <h3>Price After Discount</h3>
                <h3>{priceAfterDiscount} BDT</h3>
              </div>
              <h1 className='font-semibold text-[#00026E] text-base mb-4'>Others: </h1>
              <div className='mb-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={extras.premiumFood}
                    onChange={(e) => setExtras({ ...extras, premiumFood: e.target.checked })}
                  />
                  Premium Food (3000 BDT)
                </label>
                <label className='flex items-center gap-2 mt-2'>
                  <input
                    type='checkbox'
                    checked={extras.refreshRoom}
                    onChange={(e) => setExtras({ ...extras, refreshRoom: e.target.checked })}
                  />
                  Refresh Room (1000 BDT)
                </label>
              </div>
              <hr />
              <div className='flex items-center justify-between text-stone-600 mb-4'>
                <h3>Total Price</h3>
                <h3>{priceAfterDiscount + (extras.premiumFood ? 3000 : 0) + (extras.refreshRoom ? 1000 : 0)} BDT</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};