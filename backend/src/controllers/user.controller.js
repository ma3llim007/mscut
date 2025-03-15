import { User } from "../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/api.utils.js";
import { HttpOptions } from "../utils/utils.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (_error) {
        console.error(_error);

        throw new ApiError(500, "Something Went Wrong While Generating Refresh And Access Token");
    }
};

// Register User
const register = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(422).json(new ApiError(422, "All Field Are Required. Please Provide First Name, Last Name, Email And Password"));
        }

        const userIsExisted = await User.findOne({ email });
        if (userIsExisted) {
            return res.status(409).json(new ApiError(409, "User Is Already Exists, Please Login Or Use A Different Email"));
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        // Remove sensitive information before sending response
        const registerUser = user.toObject();
        delete registerUser.password;

        return res.status(201).json(new ApiResponse(201, registerUser, "User Register Successfully, Please Check Your Email For Verification"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Internal Server Error"));
    }
});

// Login
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(422).json(new ApiError(422, "Email And Password Are Request"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiError(404, "No Account Found With This Email."));
        }

        // Validate password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid Credentials. Please Check Your Password And Try Again."));
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        // Convert user to object and remove sensitive fields
        const loggedInUser = user.toObject();
        delete loggedInUser.password;
        delete loggedInUser.refreshToken;

        return res
            .status(200)
            .cookie("accessToken", accessToken, HttpOptions)
            .cookie("refreshToken", refreshToken, HttpOptions)
            .json(new ApiResponse(200, loggedInUser, "Login Successful. Welcome back!"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Internal Server Error"));
    }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json(new ApiError(400, "User Not Authenticated"));
        }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );
        return res
            .status(200)
            .clearCookie("accessToken", HttpOptions)
            .clearCookie("refreshToken", HttpOptions)
            .json(new ApiResponse(200, {}, "User Logged Out"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password?.trim()) {
        return res.status(422).json(new ApiError(422, "New Password Is Required"));
    }
    try {
        const user = await User.findById(req.user._id);

        // Ensure the new password is different from the current one
        const isSamePassword = await user.isPasswordCorrect(password);
        if (isSamePassword) {
            return res.status(422).json(new ApiError(422, "New password Must Be Different From The Current Password"));
        }
        user.password = password;

        await user.save();
        return res
            .status(200)
            .clearCookie("accessToken", HttpOptions)
            .clearCookie("refreshToken", HttpOptions)
            .json(new ApiResponse(200, {}, "Password Updated Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "An Error Occurred While Updating The Password."));
    }
});

export { generateAccessAndRefreshTokens, register, login, logoutUser, changePassword };
