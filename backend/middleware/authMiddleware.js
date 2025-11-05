import User from "../models/User.js";

// Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
  // Allow preflight OPTIONS requests to pass without authentication.
  if (req.method === 'OPTIONS') {
    return next();
  }

try {
// Extract the userId from the auth object provided by Clerk's middleware.
const { userId } = req.auth;

// If no userId is found, the user is not authenticated.
if (!userId) {
// Send a 401 Unauthorized response and explicitly return to end the middleware chain.
return res.status(401).json({ success: false, message: "Not authenticated" });
}

// Find the user in the database using the userId.
const user = await User.findById(userId);

// If the user is not found, send a 404 Not Found response.
if (!user) {
return res.status(404).json({ success: false, message: "User not found" });
}

// Attach the user object to the request object so subsequent handlers can access it.
req.user = user;

// Pass control to the next middleware function or route handler.
next();
} catch (error) {
// If any error occurs (e.g., database error), log it and send a 500 Server Error response.
console.error("Authentication middleware error:", error.message);
return res.status(500).json({ success: false, message: "Server error" });
}
};
