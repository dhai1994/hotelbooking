import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("/api/bookings/user", {
          withCredentials: true, // so cookies/JWT are sent
        });

        if (data.success) {
          setBookings(data.bookings);
        } else {
          console.error("Failed to fetch bookings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading your bookings...</p>;
  }

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const hotelName = booking.room?.hotel?.name || "Hotel name unavailable";
            const hotelAddress = booking.room?.hotel?.address || "Address unavailable";
            const roomType = booking.room?.roomType || "Room type unavailable";
            const roomImage = booking.room?.images?.[0] || assets.defaultHotelImg;
            const guests = booking.guests || 0;
            const totalPrice = booking.totalPrice || "N/A";

            return (
              <div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
              >
                {/* Hotel + Room Info */}
                <div className="flex flex-col md:flex-row">
                  <img
                    src={roomImage}
                    alt="hotel-img"
                    className="min-md:w-44 rounded shadow object-cover"
                  />
                  <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                    <p className="font-playfair text-2xl">
                      {hotelName}
                      <span className="font-inter text-sm"> ({roomType})</span>
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <img src={assets.locationIcon} alt="location-icon" />
                      <span>{hotelAddress}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <img src={assets.guestsIcon} alt="guests-icon" />
                      <span>{guests} Guests</span>
                    </div>
                    <p className="text-base">Total : ${totalPrice}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                  <div>
                    <p>Check-In:</p>
                    <p className="text-gray-500 text-sm">
                      {booking.checkInDate
                        ? new Date(booking.checkInDate).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>Check-Out:</p>
                    <p className="text-gray-500 text-sm">
                      {booking.checkOutDate
                        ? new Date(booking.checkOutDate).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex flex-col items-start justify-center pt-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        booking.isPaid ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        booking.isPaid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {booking.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>
                  {!booking.isPaid && (
                    <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center py-10 text-gray-500">
            No bookings found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
