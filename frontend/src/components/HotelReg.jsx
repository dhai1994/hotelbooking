import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [city, setCity] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(
        `/api/hotels`,
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        toast.success(data.message || "Hotel registered successfully")
        setIsOwner(true)
        setShowHotelReg(false)
       
      } else {
        toast.error(data.message || "Failed to register hotel")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div 
      onClick={() => setShowHotelReg(false)} 
      className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'
    >
      <form  
        onSubmit={onSubmitHandler}
        onClick={(e)=> e.stopPropagation()}  
        className="flex bg-white rounded-2xl shadow-2xl max-w-4xl max-md:mx-2 overflow-hidden"
      >
        {/* Left Image */}
        <img 
          src={assets.regImage} 
          alt="reg-image"  
          className="w-1/2 object-cover hidden md:block" 
        />

        {/* Form Section */}
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10 bg-gradient-to-b from-indigo-50 to-white">
          {/* Close Icon */}
          <img 
            src={assets.closeIcon} 
            alt="close-icon" 
            className="absolute top-4 right-4 h-5 w-5 cursor-pointer hover:scale-110 transition-transform" 
            onClick={() => setShowHotelReg(false)}
          />

          <p className="text-2xl font-bold text-indigo-600 mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="w-full mt-5">
            <label htmlFor="name" className="font-medium text-gray-700">Hotel Name</label>
            <input 
              id="name" 
              onChange={(e)=> setName(e.target.value)}
              value={name} 
              type="text" 
              placeholder="Type here" 
              className="border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 text-black placeholder-gray-400 outline-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-700">Phone</label>
            <input 
              id="contact" 
              onChange={(e)=> setContact(e.target.value)}
              value={contact} 
              type="text" 
              placeholder="Type here" 
              className="border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 text-black placeholder-gray-400 outline-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-700">Address</label>
            <input 
              id="address" 
              onChange={(e)=> setAddress(e.target.value)}
              value={address} 
              type="text" 
              placeholder="Type here" 
              className="border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 text-black placeholder-gray-400 outline-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          {/* City */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-700">City</label>
            <select 
              id="city" 
              onChange={(e)=> setCity(e.target.value)}
              value={city} 
              className="border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 text-black outline-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
              required
            >
              <option value="">Select City</option>
              {cities.map((city)=>(
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-medium shadow-lg hover:shadow-xl mr-auto px-6 py-2 rounded-lg cursor-pointer mt-6"
          >
            Register 
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelReg
