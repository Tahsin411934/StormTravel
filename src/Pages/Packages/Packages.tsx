import React, { useState, useMemo } from "react";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaClock, FaFilter } from "react-icons/fa6";

interface Package {
  _id: string;
  name: string;
  image: string;
  description: string;
  duration: string;
  discount: number;
  price: number;
}

const defaultImage = "/path/to/default-image.jpg";

const PackageComponent: React.FC = () => {
  const { data, isLoading, error } = useQuery<Package[]>({
    queryKey: ["package"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/package/activePackage`);
      return res.data;
    },
  });

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "high-to-low" | "low-to-high">("default");
  const [priceSort, setPriceSort] = useState<"default" | "high-to-low" | "low-to-high">("default");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const filteredPackages = useMemo(() => {
    let packages = data || [];

    // Filter by search
    packages = packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by price range
    packages = packages.filter(
      (pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    );

    // Sort by discount
    if (sortOrder === "high-to-low") {
      packages.sort((a, b) => b.discount - a.discount);
    } else if (sortOrder === "low-to-high") {
      packages.sort((a, b) => a.discount - b.discount);
    }

    // Sort by price (independent of discount sorting)
    if (priceSort === "high-to-low") {
      packages.sort((a, b) => b.price - a.price);
    } else if (priceSort === "low-to-high") {
      packages.sort((a, b) => a.price - b.price);
    }

    return packages;
  }, [data, search, sortOrder, priceSort, priceRange]);

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-500">Error loading packages.</p>;

  return (
    <div className="font-Poppins max-w-[1400px] pb-6 bg-[#EBF0F4]">
      <div className="pt-6 w-[90%] mx-auto">
        <div className="bg-white p-7 mb-5">
          <label className="text-blue-950 pb-2" htmlFor="search">Location/Tour:</label>
          <input
            type="text"
            placeholder="Search Packages"
            className="border border-gray-400 p-3 rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Side - Search and Filters */}
          <div className="col-span-1 space-y-4 bg-white p-4">
            {/* Mobile Filter Toggle Button */}
            <button
              className="md:hidden w-full flex items-center justify-between p-3 bg-blue-950 text-white rounded-lg"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              <span>Filters</span>
              <FaFilter className="text-lg" />
            </button>

            {/* Filters Section */}
            <div className={`${isFiltersVisible ? "block" : "hidden"} md:block`}>
              <h1 className="py-3 font-semibold text-blue-950 text-lg">Destination: {data?.length} places found</h1>
              <hr />
              <h1 className="py-3 font-semibold text-blue-950 text-lg">Filter By:</h1>
              <hr />
              {/* Price Range Filter */}
              <div className="flex flex-col py-5">
                <h1 className="py-3 font-semibold text-blue-950 text-lg">Price Range: </h1>
                <label className=" text-gray-500">BDT 0 to BDT{priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              <hr />
              <div className="py-5">
                <label className="mt-5 font-semibold text-blue-950 text-lg">Sort by Discount:</label>
                <select
                  className="border p-3 rounded-lg w-full mt-2"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "default" | "high-to-low" | "low-to-high")}
                >
                  <option value="default">Default</option>
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                </select>
              </div>
              <hr />
              {/* Sort by Price (Radio Buttons) */}
              <div>
                <label className="py-3 font-semibold text-blue-950 text-lg">Sort by Price:</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceSort"
                      value="default"
                      checked={priceSort === "default"}
                      onChange={() => setPriceSort("default")}
                      className="mr-2"
                    />
                    Default
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceSort"
                      value="high-to-low"
                      checked={priceSort === "high-to-low"}
                      onChange={() => setPriceSort("high-to-low")}
                      className="mr-2"
                    />
                    High to Low
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceSort"
                      value="low-to-high"
                      checked={priceSort === "low-to-high"}
                      onChange={() => setPriceSort("low-to-high")}
                      className="mr-2"
                    />
                    Low to High
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Package Cards */}
          <div className="col-span-3 space-y-6">
            {filteredPackages.map((packageItem) => {
              const truncatedDescription =
                packageItem.description.length > 100
                  ? packageItem.description.slice(0, 100) + "..."
                  : packageItem.description;

              return (
                <div
                  key={packageItem._id}
                  className="flex relative flex-col md:flex-row items-center border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  {/* Image Container - Full width on small devices */}
                  <div className="w-full md:w-48 h-48 flex-shrink-0">
                    <img
                      src={packageItem.image || defaultImage}
                      alt={packageItem.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="md:pl-8 text-center md:text-left mt-4 md:mt-0">
                    <h3 className="text-2xl font-bold mb-2 text-blue-950">{packageItem.name}</h3>

                    <p
                      className="text-sm absolute bg-red-600 top-1 left-1 z-10 font-bold text-white rounded-full w-16 h-16 flex items-center justify-center transform rotate-[-15deg] shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                        border: "2px solid white",
                      }}
                    >
                      <span className="block text-center leading-tight">
                        <span className="text-2xl">{packageItem.discount}%</span> OFF
                      </span>
                    </p>
                    <p className="mb-3 flex items-center text-gray-600">
                      <FaClock className="mr-2  text-lg" /> {/* Clock icon with custom styling */}
                      Duration: {packageItem.duration}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {truncatedDescription}
                      {packageItem.description.length > 100 && (
                        <Link
                          to={`/package/${packageItem._id}`}
                          className="text-blue-500 hover:underline ml-1"
                        >
                          See More
                        </Link>
                      )}
                    </p>
                    <div className="lg:flex justify-between">
                      <p className="text-lg font-bold text-blue-950 mb-4">
                        Price: {packageItem.price}BDT
                      </p>
                      <Link
                        to={`/package/${packageItem._id}`}
                        className="inline-block text-white bg-blue-950 px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageComponent;