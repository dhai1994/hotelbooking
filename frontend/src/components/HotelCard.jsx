import React from "react";
import { assets } from "../assets/assets"; // Keep this for icons (star, location)
import { Link } from "react-router-dom";

// Destructure the expected prop structure from the parent
const HotelCard = ({ room, index }) => {
  // 1. Get the image source directly from the 'room' prop
  // This will be the roomImg1, roomImg2, etc. that was passed down.
  const currentImageSrc = room?.imageSrc; 

  // Use the standard data structure properties
  const hotelName = room?.hotel?.name || "Luxury Stay";
  const hotelAddress = room?.hotel?.address || "Beautiful Location";
  const price = room?.pricePerNight || "--";
  const roomID = room?._id || "";

  return (
    <Link
      to={`/rooms/${roomID}`}
      onClick={() => scrollTo(0, 0)}
      key={roomID}
      className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          // *** USE THE PASSED DOWN IMAGE SOURCE ***
          src={currentImageSrc} 
          alt={`${hotelName} - ${hotelAddress}`}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Optional Badge: Shows on every other card */}
        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full shadow-md">
            Best Seller
          </p>
        )}
      </div>

      {/* Hotel Info Section */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-payfair text-xl font-medium text-gray-800">
            {hotelName}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" />
            4.5
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{hotelAddress}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl text-gray-800">
              ${price}/night
            </span>
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;