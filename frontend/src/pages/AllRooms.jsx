import React, { useMemo, useState } from 'react';
import { assets, facilityIcons } from '../assets/assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className='accent-blue-500'
    />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
      className='accent-blue-500'
    />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms = [], currency = '$' } = useAppContext();
  const navigate = useNavigate();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ roomTypes: [], priceRange: [] });
  const [selectedSort, setSelectedSort] = useState('');

  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Bed', 'Family Suite'];
  const priceRanges = [
    { key: '0-500', min: 0, max: 500, label: '0 to 500' },
    { key: '500-1000', min: 500, max: 1000, label: '500 to 1000' },
    { key: '1000-2000', min: 1000, max: 2000, label: '1000 to 2000' },
    { key: '2000-3000', min: 2000, max: 3000, label: '2000 to 3000' },
  ];
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First'];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) updated[type] = [...updated[type], value];
      else updated[type] = updated[type].filter((v) => v !== value);
      return updated;
    });
  };

  const handleSortChange = (option) => setSelectedSort(option);

  const matchesRoomType = (room) =>
    selectedFilters.roomTypes.length === 0 || selectedFilters.roomTypes.includes(room.roomType);

  const matchesPriceRange = (room) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((key) => {
      const range = priceRanges.find((r) => r.key === key);
      return room.pricePerNight >= range.min && room.pricePerNight <= range.max;
    });
  };

  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High') return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'Price High to Low') return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)
    ).sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({ roomTypes: [], priceRange: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className='pt-28 md:pt-30 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='mb-8'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex-1'>
          {filteredRooms.length === 0 ? (
            <p className='text-gray-500'>No rooms found</p>
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room._id}
                className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'
              >
                <img
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  src={room.images[0]}
                  alt='hotel-img'
                  className='max-h-65 md:w rounded-xl shadow-lg object-cover cursor-pointer'
                />
                <div className='md:w-1/2 flex flex-col gap-2'>
                  <p className='text-gray-500'>{room.hotel.city}</p>
                  <p
                    onClick={() => navigate(`/rooms/${room._id}`)}
                    className='text-gray-800 text-3xl font-playfair cursor-pointer'
                  >
                    {room.hotel.name}
                  </p>
                  <div className='flex items-center'>
                    <StarRating />
                    <p className='ml-2'>200+ reviews</p>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                    <img src={assets.locationIcon} alt='location-Icon' />
                    <span>{room.hotel.address}</span>
                  </div>
                  <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {room.amenities.map((item, idx) => (
                      <div key={idx} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                        <p className='text-xs'>{item}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className='text-xl font-medium text-gray-700'>
                      {currency}{room.pricePerNight} /night
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 h-fit mt-[-110px]'>
          <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
            <p className='text-base font-medium text-gray-800'>FILTERS</p>
            <span className='text-xs cursor-pointer' onClick={clearFilters}>CLEAR</span>
          </div>
          <div>
            <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
              {roomTypes.map((type) => (
                <CheckBox
                  key={type}
                  label={type}
                  selected={selectedFilters.roomTypes.includes(type)}
                  onChange={(checked) => handleFilterChange(checked, type, 'roomTypes')}
                />
              ))}
            </div>
            <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Price Range</p>
              {priceRanges.map((range) => (
                <CheckBox
                  key={range.key}
                  label={`${currency} ${range.label}`}
                  selected={selectedFilters.priceRange.includes(range.key)}
                  onChange={(checked) => handleFilterChange(checked, range.key, 'priceRange')}
                />
              ))}
            </div>
            <div className='px-5 pt-5 pb-5'>
              <p className='font-medium text-gray-800 pb-2'>Sort By</p>
              {sortOptions.map((option) => (
                <RadioButton
                  key={option}
                  label={option}
                  selected={selectedSort === option}
                  onChange={() => handleSortChange(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
