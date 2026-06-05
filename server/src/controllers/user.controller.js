import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const exists = await User.findOne(email);
    if (!exists) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        name: name?.toLowerCase() || "",
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
        }, "User create successfully"))
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!emial || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
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
        $unset: { refreshToken: 1 },
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
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(201).json(new ApiResponse(201, user, "user Ready to fetch"))
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
};