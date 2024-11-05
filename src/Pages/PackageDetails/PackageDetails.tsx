import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import { useParams } from "react-router-dom";

const PackageDetails: React.FC = () => {
  const { id } = useParams();

  // Fetch data from API using Tanstack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["packageDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/package/${id}`);
      const packageData = res.data;
      return {
        ...packageData,
        afterDiscountPrice: packageData.price - (packageData.price * packageData.discount) / 100,
      };
    },
    refetchInterval: 60 * 60 * 1000, // every hour
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading package details.</p>;

  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800 font-Poppins">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full h-60 sm:h-96 dark:bg-gray-500"
        />
        <div className="p-6 pb-12 m-4 mx-auto bg-slate-200 p-8 -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
          <div className="space-y-2">
            <p className="inline-block text-2xl font-semibold sm:text-3xl">
              {data?.name}
            </p>
            <p className="text-xs dark:text-gray-600">Powered by Share Trip</p>
          </div>
          <div className="dark:text-gray-800">
            <p>{data?.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {data?.features.map((item: string, index: number) => (
              <div key={index} className="text-center">
                <p className="text-sm py-1 rounded-xl text-gray-100 dark:text-gray-400 font-bold bg-blue-500">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold">Duration: {data?.duration}</p>
          <div className="flex justify-between items-center space-x-4">
            <p className="text-base font-semibold">Price: {data?.afterDiscountPrice} BDT <span><del>{data.price}</del></span></p> 
            <p className="text-xs font-semibold"> {data?.discount}% Off</p>
            
            <button className="text-xs font-semibold px-4 py-2 bg-blue-900 rounded-md text-white hover:bg-blue-500 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
