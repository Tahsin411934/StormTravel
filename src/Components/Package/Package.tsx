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
    <div className="w-[90%] mx-auto font-Poppins">
      <div className="pt-16 pb-6 text-3xl font-bold">
        Top Package Deals
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3} 
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
      >
        {data?.map((packageItem) => (
          <SwiperSlide key={packageItem._id}>
            <div className="relative mb-12 w-96 group transition-opacity duration-300">
              <div className="w-full h-[240px] relative overflow-hidden rounded-lg">
              <img
        src={packageItem.image || defaultMaleImage} // Use default image if none available
        alt={packageItem.name}
        className="w-full h-full object-cover"
      />
              </div>
              <Link to={`/package/${packageItem._id}`} className="absolute text-white text-center mx-auto text-xl font-bold opacity-0 group-hover:opacity-100 inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-100 transition-opacity duration-300">
                <h1 className="pt-5">{packageItem.name}</h1>
                <br />
                <p>
                  Flat <span className="text-4xl">{packageItem.discount}%</span> Discount
                </p>
                <p className="text-base">{packageItem.description}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PackageComponent;
