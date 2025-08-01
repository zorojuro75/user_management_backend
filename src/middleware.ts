import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { supabase } from "./db";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        status: string;
        // Add other user properties as needed
      };
    }
  }
}

// CORS middleware configuration
export const corsMiddleware = cors({
  origin: "*", // Allow all origins; customize as needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Example of a custom middleware (logging requests)
export const requestLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JWT authentication middleware
export const authenticateJWT = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const userPayload = jwt.verify(token, secret) as { userId: string };
    const { data, error } = await supabase
      .from("users")
      .select("id, status")
      .eq("id", userPayload.userId)
      .single();
      console.log("Supabase result:", { data, error });
    if (error || !data) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = { id: data.id, status: data.status };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Middleware to check if user is authenticated and not blocked
export const authAndBlockCheck = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "User not logged in" });
  }
  if (user.status === "blocked") {
    return res.status(403).json({ message: "User is blocked. Logging out." });
  }
  next();
};
