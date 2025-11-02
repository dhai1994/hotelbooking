import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";


const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken } = useAppContext();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const selectedRoom = rooms.find((room) => room._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id, rooms]);

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select Check-In and Check-Out dates");
      return;
    }

    // Dummy availability check logic (replace with real API if needed)
    const isRoomAvailable = true;
    setIsAvailable(isRoomAvailable);
  };

  // Booking handler
  const handleBooking = async () => {
    if (!isAvailable) {
      toast.error("Please check availability first");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Pay At Hotel",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Booking confirmed!");
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || "Booking failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  if (!room) return <p className="text-center mt-20">Loading room details...</p>;

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}{" "}
          <span className="font-inter text-sm text-gray-500">
            ({room.roomType})
          </span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full ml-2">
          20% OFF
        </p>
      </div>

      <div className="mt-4 flex items-center">
        <StarRating />
        <p className="ml-2">200+ reviews</p>
      </div>

      <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
        <img src={assets.locationIcon} alt="location-Icon" />
        {room.hotel.address}
      </p>

      <div className="mt-6">
        <img
          src={mainImage}
          alt="Room"
          className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {room.amenities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
          >
            <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
            <p className="text-xs">{item}</p>
          </div>
        ))}
      </div>

      {/* Availability Check Section */}
      <div className="mt-10 bg-gray-100 p-5 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="p-2 border rounded-lg"
          placeholder="Check-In Date"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="p-2 border rounded-lg"
          placeholder="Check-Out Date"
        />
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="p-2 border rounded-lg w-20"
          placeholder="Guests"
        />
        <button
          onClick={handleCheckAvailability}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Check Availability
        </button>
      </div>

      {isAvailable !== null && (
        <p className={`mt-4 ${isAvailable ? "text-green-600" : "text-red-600"}`}>
          {isAvailable
            ? "Room is available for selected dates!"
            : "Room is not available."}
        </p>
      )}

      {/* Price and Booking */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-2xl font-medium text-gray-700">
          ${room.pricePerNight} / night
        </p>
        <button
          onClick={handleBooking}
          className="px-5 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
