import HotelCard from './HotelCard.jsx'
import Title from './Title.jsx'
import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'

const FeatureDestination = () => {
  const { rooms, navigate } = useAppContext()

  if (!rooms || rooms.length === 0) {
    return null; 
  }                                                    

  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-black py-20'>
      <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world , offering unparalleled luxury and unforgettable experiences'/>
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {rooms.slice(0, 4).map((room , index) => (
          <HotelCard key={room._id} room={room} index={index}/>
        ))}
      </div>

      <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }} className='w-fit mx-auto my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-black hover:bg-gray-600 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  )
}

export default FeatureDestination
