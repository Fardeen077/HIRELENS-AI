import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    if (password.length < 6) {
        throw new ApiError(400, "password must be at least 6 characters")
    }
    const exists = await User.findOne({ email });
    if (exists) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        username: username?.toLowerCase() || "",
        email: email?.toLowerCase() || "",
        password,
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const opts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res.status(201)
        .cookie("accessToken", accessToken, opts)
        .cookie("refreshToken", refreshToken, opts)
        .json(new ApiResponse(201, {
            user: await User.findById(user._id).select("-password -refreshToken")
        }, "User created successfully"))
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordVali = await user.isPasswordCorrect(password);
    if (!isPasswordVali) {
        throw new ApiError(401, "Password is incorrect");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const opts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res.status(201)
        .cookie("accessToken", accessToken, opts)
        .cookie("refreshToken", refreshToken, opts)
        .json(new ApiResponse(201, {
            user: await User.findById(user._id).select("-password -refreshToken")
        }, "User login successfully"))
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" },
    });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "user Ready to fetch"))
});

const updateProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!req.file) {
        throw new ApiError(400, "image file is required")
    }
    console.log(req.file);

    if (user.profilePicPublicId) {
        await cloudinary.uploader.destroy(user.profilePicPublicId);
    }

    const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        "resource_type": "image",
    });
    console.log(uploadImage);

    const updateUserProfile = await User.findByIdAndUpdate(user, {
        profilePic: uploadImage.secure_url,
        profilePicPublicId: uploadImage.public_id,
    }, { new: true }).select("-password -refreshToken");

    await fs.promises.unlink(req.file.path)
    return res.status(200).json(new ApiResponse(200, { user: updateUserProfile }, "Profile updated successfully"))
});
export {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    updateProfile
};