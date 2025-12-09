import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import HotelCard from "./HotelCard.jsx";
import Title from "./Title.jsx";
import { useAppContext } from "../context/AppContext.jsx";

// Import your local images
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";

const FeatureDestination = () => {
  const { navigate } = useAppContext();

  // Use your local images for display
  const featuredRooms = [
    {
      _id: "1", // Use _id for consistency with backend/keys
      name: "Luxury Ocean View Suite",
      // We will use the 'img' key to pass the image source
      imageSrc: roomImg1, 
      location: "Maldives",
      price: "450",
    },
    {
      _id: "2",
      name: "Mountain Retreat Cabin",
      imageSrc: roomImg2,
      location: "Switzerland",
      price: "390",
    },
    {
      _id: "3",
      name: "Desert Oasis Villa",
      imageSrc: roomImg3,
      location: "Dubai",
      price: "520",
    },
    {
      _id: "4",
      name: "Tropical Paradise Bungalow",
      imageSrc: roomImg4,
      location: "Bali",
      price: "410",
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-black py-20 text-white">
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"
      />

      <div className="w-full mt-20">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {featuredRooms.map((room, index) => (
            <SwiperSlide key={room._id}>
              <div
                onClick={() => {
                  navigate("/rooms");
                  scrollTo(0, 0);
                }}
                className="cursor-pointer"
              >

                <HotelCard
                  room={{
                    hotel: { name: room.name, address: room.location },
                    pricePerNight: room.price,
                    imageSrc: room.imageSrc,
                    _id: room._id,
                  }}
                  index={index}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
        className="w-fit mx-auto mt-10 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-black hover:bg-gray-600 transition-all cursor-pointer"
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeatureDestination;