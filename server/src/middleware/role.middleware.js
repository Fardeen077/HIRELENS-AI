import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const roles = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        // console.log(...allowedRoles);

        if (!req.user) {
            throw new ApiError(401, "Authentication required")
        }
        const userRole = req.user.role;
        // console.log(userRole);

        if (!userRole) {
            throw new ApiError(403, "user role not found");
        }

        if (!allowedRoles.includes(userRole)) {
            throw new ApiError(403, "You are not allowed to access this resource");
        }
        next();
    })
}