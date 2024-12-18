import React from "react";
import { usePackage } from "../../utils/usePackage";
import { Link } from "react-router-dom";

const defaultMaleImage = "/path/to/default-male-image.jpg"; // Replace with your default male image path

const PackageComponent: React.FC = () => {
  const { data, isLoading, error } = usePackage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-[90%] mx-auto font-Poppins">
      <div className="pt-16 pb-6 text-3xl font-bold text-center text-gray-900">
        Top Package Deals
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.map((packageItem) => {
          const discountedPrice =
            packageItem.price - (packageItem.price * packageItem.discount) / 100;

          return (
            <div
              key={packageItem._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-101 transition-transform duration-300"
            >
              <div className="w-full h-[200px] relative overflow-hidden">
                <img
                  src={packageItem.image || defaultMaleImage} // Use default image if none available
                  alt={packageItem.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                  {packageItem.name}
                </h1>

                {/* Display Duration */}
                <p className="text-sm text-gray-600">{packageItem.duration}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {packageItem.discount}% Off
                  </div>
                  <div className="text-lg font-medium text-gray-500 line-through">
                    ${packageItem.price.toLocaleString()} {/* Original price */}
                  </div>
                  <div className="text-xl font-bold text-red-600">
                    ${discountedPrice.toLocaleString()} {/* Discounted price */}
                  </div>
                </div>

                <Link
                  to={`/package/${packageItem._id}`}
                  className="block text-center text-blue-500 font-semibold hover:underline mt-4 transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageComponent;
