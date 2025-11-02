import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async(req , res)=>{
    try{
        const {name , address , contact , city} = req.body;
        const owner = req.user._id;


       const existingHotel = await Hotel.findOne({ name, address });
if (existingHotel) {
  return res.json({ success: false, message: "Hotel already regitered" });
}

        await Hotel.create({name , address , contact , city , owner: req.user._id});

        await User.findByIdAndUpdate(owner , {role:"hotelOwner"});

        res.json({success:true , message:"Hotel Registered Successfully"})
    }catch(error){
        res.json({success:false , message:error.message})
    }
}