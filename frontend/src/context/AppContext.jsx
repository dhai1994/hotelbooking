import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchUserRooms = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");
      const { data } = await api.get("/api/owner/my-rooms", {
        headers: { Authorization: `Bearer ${token}` },
        params: { _ts: Date.now() }, // cache-buster
      });

      if (data?.success) {
        setRooms(Array.isArray(data.rooms) ? data.rooms : []);
      } else {
        toast.error(data?.message ?? "Request failed");
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(`${status ? status + " " : ""}${msg}`);
      console.error("fetchUserRooms error:", { status, data: error?.response?.data });
    }
  };

  useEffect(() => {
    if (user) fetchUserRooms();
  }, [user]); // only run when logged in

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios: api,              // expose configured axios
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
