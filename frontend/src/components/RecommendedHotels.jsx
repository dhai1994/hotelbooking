import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard.jsx';
import Title from './Title.jsx';
import { useAppContext } from '../context/AppContext';

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    if (!rooms || rooms.length === 0) return;
    const filteredHotels = rooms.filter(room => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  if (!recommended || recommended.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-black py-20'>
      <Title 
        title='Recommended Hotels' 
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotels;
