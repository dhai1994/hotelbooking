import React from 'react';
import { assets } from '../assets/assets'; 

// Define the amenities data structure
const amenities = [
  { name: 'Pool', icon: 'poolIcon' }, 
  { name: 'Free parking', icon: 'freeParkingIcon' }, 
  { name: 'Washing machine', icon: 'washingMachineIcon' }, 
  { name: 'AC', icon: 'acIcon' }, 
  { name: 'Fireplace', icon: 'fireplaceIcon' }, 
  { name: 'TV', icon: 'tvIcon' }, 
  { name: 'Heating', icon: 'heatingIcon' }, 
  { name: 'Barbecue', icon: 'barbecueIcon' }, 
];

const AmenitiesSelector = () => {
  return (
    
    <div className="flex flex-col items-center py-20 bg-black text-white">
      
     
      <div className="max-w-3xl text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-white">
          Get specific with your favourite amenities
        </h2>
       
        <p className="mt-3 text-lg text-shadow-white">
          Choose from top features like these – and more – for a personalised stay.
        </p>
      </div>
<div className="w-full max-w-6xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          {amenities.map((amenity, index) => (
            <button
              key={index}
              className="flex items-center justify-start gap-3 p-4 
                         border border-gray-700 rounded-xl 
                         shadow-sm transition-all duration-200 
                         text-base font-medium text-white 
                         
                         // Add hover effect for visual feedback
                         hover:bg-gray-800 hover:border-gray-500"
            >
              <img 
                src={assets[amenity.icon] || assets.badgeIcon} 
                alt={amenity.name}
                className="w-5 h-5" 
              />
              
              <span className='whitespace-nowrap'>
                {amenity.name}
              </span>
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AmenitiesSelector;