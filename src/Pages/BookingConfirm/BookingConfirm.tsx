import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { usePackageById } from '../../utils/usePackageById';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

import BikasIcon from '../../assets/icons/bikas.webp';
import NagadIcon from '../../assets/icons/nagad.jpg';
import UpaiIcon from '../../assets/icons/upai.png';
import MastercardIcon from '../../assets/icons/mastercard.png';
import VisaIcon from '../../assets/icons/visa.png';

export const BookingConfirm = () => {
    const location = useLocation();
    const bookingData = location.state;
    console.log(bookingData);
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = usePackageById(id!);
    const discount = data?.discount ?? 0;
    const price = data?.price ?? 0;
    const priceAfterDiscount = (price / 100) * (100 - discount);

    const [paymentMethod, setPaymentMethod] = useState<string>('bikas');
    const [couponCode, setCouponCode] = useState<string>(''); // Coupon code state
    const [finalPrice, setFinalPrice] = useState<number>(priceAfterDiscount); // Final price after applying coupon
    const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false); // To track if coupon is applied

    const updateBookingStatus = async () => {
        try {
            const response = await axios.put(`https://share-trip-serverv1.vercel.app/api/booking/bookings/${bookingData.id}`, {
                status: true, // Update the booking status to true
            });

            if (response.status === 200) {
                // Show SweetAlert2 confirmation when booking status is updated
                Swal.fire({
                    title: 'Order Confirmed!',
                    text: 'Your booking has been confirmed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Failed to update booking status.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update booking status.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleCouponApply = () => {
        // Assuming coupon code gives a 10% discount as an example (you can replace with actual logic)
        if (couponCode === 'DISCOUNT10') {
            const newPrice = bookingData?.bookingData?.totalPrice * 0.9; // Apply 10% discount
            setFinalPrice(newPrice);
            setIsCouponApplied(true);
        } else {
            Swal.fire({
                title: 'Invalid Coupon',
                text: 'The coupon code you entered is invalid.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    console.log(bookingData?.bookingData);

    return (
        <div className="bg-[#EBF0F4]">
            <div className="w-[85%] mx-auto text-2xl p-5 font-semibold bg-white flex items-center gap-10 rounded-md mt-3 mb-2 text-[#00026E]">
                <h1>Review Your Booking:</h1>
                <h1>{data?.name}</h1>
            </div>

            <div className="grid grid-cols-3 w-[85%] pb-10 mx-auto gap-4">
                {/* Booking Details */}
                <div className="col-span-2 rounded-xl flex flex-col justify-between h-full">
                    <div className="flex justify-center items-center bg-gray-100 h-full">
                        <div className="w-full p-6 bg-white rounded shadow-md h-full">
                            <div className="mb-6">
                                <label className="text-base font-bold text-[#00026E]">Select Payment Method:</label>
                            </div>
                            <ul className="flex flex-wrap gap-6 mt-8 justify-between">
                                <li
                                    className={`cursor-pointer w-24 flex flex-col items-center p-4 rounded-lg ${paymentMethod === 'bikas' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50'
                                        }`}
                                    onClick={() => setPaymentMethod('bikas')}
                                >
                                    <img src={BikasIcon} alt="Bikas" className="w-12 h-12 rounded-full mb-2" />
                                    <p className="text-center text-sm font-medium">Bikas</p>
                                </li>
                                <li
                                    className={`cursor-pointer w-24 flex flex-col items-center p-4 rounded-lg ${paymentMethod === 'nagad' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50'
                                        }`}
                                    onClick={() => setPaymentMethod('nagad')}
                                >
                                    <img src={NagadIcon} alt="Nagad" className="w-12 h-12 rounded-full mb-2" />
                                    <p className="text-center text-sm font-medium">Nagad</p>
                                </li>
                                <li
                                    className={`cursor-pointer w-24 flex flex-col items-center p-4 rounded-lg ${paymentMethod === 'upai' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50'
                                        }`}
                                    onClick={() => setPaymentMethod('upai')}
                                >
                                    <img src={UpaiIcon} alt="Upai" className="w-12 h-12 rounded-full mb-2" />
                                    <p className="text-center text-sm font-medium">Upai</p>
                                </li>
                                <li
                                    className={`cursor-pointer w-24 flex flex-col items-center p-4 rounded-lg ${paymentMethod === 'mastercard' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50'
                                        }`}
                                    onClick={() => setPaymentMethod('mastercard')}
                                >
                                    <img src={MastercardIcon} alt="Mastercard" className="w-12 h-12 rounded-full mb-2" />
                                    <p className="text-center text-sm font-medium">Mastercard</p>
                                </li>
                                <li
                                    className={`cursor-pointer w-24 flex flex-col items-center p-4 rounded-lg ${paymentMethod === 'visa' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50'
                                        }`}
                                    onClick={() => setPaymentMethod('visa')}
                                >
                                    <img src={VisaIcon} alt="Visa" className="w-12 h-12 rounded-full mb-2" />
                                    <p className="text-center text-sm font-medium">Visa</p>
                                </li>
                            </ul>
                            <div className='w-full border border-gray-300 mt-16 p-5'>
                                <div className='flex items-center justify-between text-stone-600 mb-4'>
                                    <h3>Total Payable</h3>
                                    <h3>{bookingData?.bookingData?.totalPrice.toFixed(2)} BDT</h3> {/* Show totalPrice */}
                                </div>
                                <div className="flex items-center justify-between text-stone-600 mb-4">
                                    <h3>Use Your Coupon</h3>
                                    <div className="flex items-center">
                                        <input
                                            className="border border-emerald-300 rounded-l-lg px-3 py-2 outline-none focus:border-emerald-500"
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)} // Update coupon state
                                        />
                                        <button
                                            className="bg-emerald-500 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-600 transition"
                                            onClick={handleCouponApply} // Apply coupon
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={updateBookingStatus}
                                className="w-full mt-16 p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fare Summary */}
                <div className="col-span-1 flex flex-col justify-between h-full">
                    <div className="bg-white p-6 rounded-xl h-full flex flex-col">
                        <div className="flex-1 items-center gap-2 mb-3">
                            <h1 className="font-semibold text-[#00026E] text-base mb-4">Traveler Summary:</h1>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Name: </h3>
                                <h3>{bookingData?.bookingData?.travelers || 'N/A'} </h3>
                            </div>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Contact Number: </h3>
                                <h3>{bookingData?.bookingData?.phoneNumber || 'N/A'} </h3>
                            </div>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Mail:</h3>
                                <h3>{bookingData?.bookingData?.emailAddress || 'N/A'} </h3>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="flex-1">
                            <h1 className="font-semibold text-[#00026E] text-base mb-4">Fare Summary:</h1>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Original Price</h3>
                                <h3>{data?.price || 'N/A'} BDT</h3>
                            </div>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Discount</h3>
                                <h3>{data?.discount || 'N/A'}%</h3>
                            </div>
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Price After Discount</h3>
                                <h3>{priceAfterDiscount.toFixed(2) || 'N/A'} BDT</h3>
                            </div>
                            <h1 className="font-semibold text-[#00026E] text-base mb-4">Extra Facilities:</h1>
                            <h1>{bookingData?.extras?.premiumFood}</h1>
                            <div className="mb-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={bookingData?.bookingData?.extras?.premiumFood || false}
                                        readOnly
                                    />
                                    <span className="text-stone-600">Premium Food(3000 BDT)</span>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={bookingData?.bookingData?.extras?.refreshRoom || false}
                                        readOnly
                                    />
                                    <span className="text-stone-600">Refresh Room(1000 BDT)</span>
                                </label>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between text-stone-600 mb-4">
                                <h3>Total</h3>
                                <h3>{bookingData?.bookingData?.totalPrice.toFixed(2) || 'N/A'} BDT</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
