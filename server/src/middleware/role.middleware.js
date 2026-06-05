import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const roles = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Authentication required")
        }
        const userRole = req.user.role;

        if (userRole) {
            throw new ApiError(403, "user role not found");
        }

        if (!allowedRoles.includes(userRole)) {
            throw new ApiError(403, "You are not allowed to access this resource");
        }
        next();
    })
}