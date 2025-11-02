import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error(" Cloudinary env vars missing. Check your .env file");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  //console.log(" Cloudinary connected:", process.env.CLOUDINARY_CLOUD_NAME);
};

export default connectCloudinary;
