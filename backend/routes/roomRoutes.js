import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";

const roomRouter = express.Router();

// Add new room
roomRouter.post("/add-room", upload.array("images", 4), createRoom);


// Get all rooms
roomRouter.get("/", getRooms);

// Owner's rooms
roomRouter.get("/my-rooms", protect, getOwnerRooms);

// Toggle availability
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
