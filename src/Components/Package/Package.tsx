import React from "react";
import { axiosSecure } from "../../Hook/useAxiouSecure";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

interface Package {
  _id: string;
  name: string;
  image: string;
  description: string;
  discount: number;
}

const defaultMaleImage = "/path/to/default-male-image.jpg"; // Replace with your default male image path

const PackageComponent: React.FC = () => {
  const { data, isLoading, error } = useQuery<Package[]>({
    queryKey: ["package"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/package/activePackage`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading packages.</p>;

  return (
    <div className="w-[90%] mx-auto font-Poppins max-w-[1400px]">
      <div className="pt-16 pb-6 text-3xl font-bold">Top Package Deals</div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5} // Default for small screens
        centeredSlides={true} // Center the active slide
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ height: "auto" }} // Optional: adjust height as needed
        breakpoints={{
          // When the window width is >= 1024px (large screens)
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
          },
          // When the window width is >= 768px (medium screens)
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          // When the window width is < 768px (small screens)
          640: {
            slidesPerView: 1.5,
            centeredSlides: true,
          },
        }}
      >
        {data?.map((packageItem) => (
          <SwiperSlide key={packageItem._id}>
            <Link to={`/package/${packageItem._id}`}>
              <div className="relative mb-12 w-full sm:w-[280px] md:w-[320px] lg:w-[380px] group transition-opacity duration-300">
                {/* Image Section */}
                <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] relative overflow-hidden rounded-lg">
                  <img
                    src={packageItem.image || defaultMaleImage} // Use default image if none available
                    alt={packageItem.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Discount Badge */}
                  <div
                    className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                      border: "2px solid white",
                    }}
                  >
                    {packageItem.discount}% OFF
                  </div>
                </div>

                {/* Package Name Below the Image */}
                <h1 className="text-lg font-bold mt-2 text-center sm:text-xl">
                  {packageItem.name}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PackageComponent;