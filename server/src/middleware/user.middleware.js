import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

export const protectRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    };
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
        throw new ApiError(401, "Invalid accessToken");
    };
    req.user = user;
    next();
});
