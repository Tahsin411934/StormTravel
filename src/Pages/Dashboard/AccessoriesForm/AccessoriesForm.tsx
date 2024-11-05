import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { axiosSecure } from "../../../Hook/useAxiouSecure";
// import { axiosSecure } from "../../../Hook/useAxiouSecure";

interface AccessoryDetails {
    productName: string;
    price: number;
    discount?: number;
    description: string;
    imgUrl: string;
    category: string;
}

const imageHostingApi = 'https://api.imgbb.com/1/upload?key=fe740aa3ec54bedc61f2e7320ed14d7d';

const AccessoriesForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<AccessoryDetails>();

    const onSubmit = async (data: AccessoryDetails) => {
        try {
            const res = await axiosSecure.post("/api/accessories", data);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Accessory added successfully.",
                    confirmButtonText: "OK",
                });
                reset();
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "Something went wrong. Please try again.",
                confirmButtonText: "OK",
            });
            console.error("Error adding accessory:", error);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("image", file);

                const response = await axios.post(imageHostingApi, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const imageUrl = response.data.data.url;
                setValue("imgUrl", imageUrl); // Update the value in react-hook-form
            } catch (error) {
                console.error("Error uploading image to ImgBB", error);
            }
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-4 shadow-lg p-8 rounded-lg bg-white border border-blue-200">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#1C9FE1]">
                Add New Accessory
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full px-4 py-2"
                            {...register("productName", { required: "Product name is required" })}
                        />
                        {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full px-4 py-2"
                            {...register("price", { required: "Price is required" })}
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Discount (%)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Discount"
                            className="input input-bordered w-full px-4 py-2"
                            {...register("discount")}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">category</span>
                        </label>
                        <select
                            className="select select-bordered w-full px-4 py-2"
                            {...register("category", { required: "category is required" })}
                        >
                            <option value="">Select category</option>
                            <option value="Luggage">Luggage</option>
                            <option value="cable">Cable</option>
                            <option value="Travel Bags">Travel Bags</option>
                            <option value="Travel Pillows">Travel Pillows</option>
                            <option value="Packing Organizers">Packing Organizers</option>
                            <option value="Pack">Pack</option>
                        </select>
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image Upload</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered w-full px-4 py-2"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                <div className="form-control w-full mb-6">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        placeholder="Product Description"
                        className="input input-bordered w-full px-4 py-2 h-24"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="btn w-full sm:w-auto bg-[#1C9FE1] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1b8ecc] transition duration-200"
                    >
                        Add Accessory
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccessoriesForm;
