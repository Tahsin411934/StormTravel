import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthProvider/AuthContext";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

type FormData = {
  travelers: string;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  deliveryOption: string; // New field for delivery option
};

type OrderItem = {
  _id: string;
  imgUrl: string;
  productName: string;
  price: number;
  quantity: number;
  discount: number; // Discount in percentage
};

export const AccessoriesOrder = () => {
  const location = useLocation();
  const { user } = useAuth();
  const cartItems: OrderItem[] = location.state?.cart || [];

  // State for extras and delivery option
  const [extras, setExtras] = useState({
    premiumFood: false,
    refreshRoom: false,
  });

  const [deliveryOption, setDeliveryOption] = useState("office"); // Default is office

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = cartItems.reduce((total, item) => {
      const priceAfterDiscount =
        item.price * (1 - item.discount / 100) * item.quantity;
      return total + priceAfterDiscount;
    }, 0);

    // Add extra charge for Home Delivery
    if (deliveryOption === "home") {
      total += 150; // Home delivery extra charge
    }

    return total;
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: newQuantity } : item
    );
    console.log("Updated Cart:", updatedCart);
  };

  const onSubmit = (formData: FormData) => {
    console.log("Form Data:", formData);
    console.log("Extras:", extras);
    console.log("Cart Items:", cartItems);
    console.log("Delivery Option:", deliveryOption);
    alert("Order submitted successfully!");
  };

  return (
    <div className="bg-[#EBF0F4]">
      {/* Header */}
      <div className="w-[85%] mx-auto text-2xl p-5 font-semibold bg-white flex items-center gap-10 rounded-md mt-3 mb-2 text-[#00026E]">
        <h1>Review Your Order:</h1>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 w-[85%] pb-10 mx-auto gap-4">
        {/* Form Section */}
        <div className="col-span-2 rounded-xl flex flex-col justify-between h-full">
          <div className="flex justify-center items-center bg-gray-100 h-full">
          <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full p-6 bg-white rounded shadow-md h-full"
            >
              {/* Travelers */}
              <div className="mb-4">
                <label htmlFor="travelers" className="block text-gray-700 mb-2">
                  Traveler's Name
                </label>
                <input
                  type="text"
                  id="travelers"
                  value={user?.displayName || ""}
                  {...register("travelers", { required: "Name is required" })}
                  className={`form-control border w-full ${
                    errors.travelers ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E]`}
                  placeholder="Enter your name"
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
                  className={`form-control w-full border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
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
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    className={`form-control flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00026E] ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
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
                  value={user?.email || ""}
                  {...register("emailAddress", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`form-control w-full border ${
                    errors.emailAddress ? "border-red-500" : "border-gray-300"
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

        {/* Summary Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-base font-bold mb-4 text-[#00026E]">Order Summary</h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-700">Your cart is empty.</div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border-b last:border-none flex items-center gap-4"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.productName}</h3>
                    <p className="text-xs text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800">
                      Price:{" "}
                      <FaBangladeshiTakaSign className="inline" />
                      {(item.price * (1 - item.discount / 100)).toFixed(2)} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
                            {/* Delivery Option */}
                            <div className="mb-4">
                            <h2 className="text-base font-bold mb-4 text-[#00026E]">Delevery Option</h2>
                <div className="flex items-center gap-4">
                  <div>
                    <input
                      type="radio"
                      id="homeDelivery"
                      name="deliveryOption"
                      value="home"
                      checked={deliveryOption === "home"}
                      onChange={() => setDeliveryOption("home")}
                      className="mr-2"
                    />
                    <label htmlFor="homeDelivery">Home Delivery</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="officeDelivery"
                      name="deliveryOption"
                      value="office"
                      checked={deliveryOption === "office"}
                      onChange={() => setDeliveryOption("office")}
                      className="mr-2"
                    />
                    <label htmlFor="officeDelivery">Receive from Office</label>
                  </div>
                </div>
              </div>
              <div className="border-t mt-4 pt-4">
                <h3 className="text-lg font-bold text-[#00026E]">
                  Total: {calculateTotalPrice().toFixed(2)} BDT
                </h3>
                {deliveryOption === "home" && (
                  <p className="text-sm text-gray-600 mt-2">
                    (Home delivery charge of 150 BDT included)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
