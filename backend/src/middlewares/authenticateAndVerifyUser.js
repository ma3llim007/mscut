import jwt from "jsonwebtoken";
import { ApiError, asyncHandler } from "../utils/api.utils.js";
import { isTokenExpired, HttpOptions } from "../utils/utils.js";
import { generateAccessAndRefreshTokens } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";

const authenticateAndVerify = asyncHandler(async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshToken;

        // If no access token, try refreshing it
        if (!accessToken || isTokenExpired(accessToken)) {
            if (!refreshToken) {
                return res.status(401).json(new ApiError(401, "Refresh Token Missing. Please Log In Again."));
            }

            // Decode Refresh Token
            const decodedToken = jwt.decode(refreshToken);
            if (!decodedToken?._id) {
                return res.status(401).json(new ApiError(401, "Invalid Refresh Token."));
            }

            // Generate New Tokens
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(decodedToken._id);

            // Set New Token In Cookies
            res.cookie("accessToken", newAccessToken, HttpOptions);
            res.cookie("refreshToken", newRefreshToken, HttpOptions);

            // Use the new access token for further verification
            accessToken = newAccessToken;
        }

        // Verify and decode access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedAccessToken?._id) {
            return res.status(401).json(new ApiError(401, "Invalid Access Token."));
        }

        // Fetch Admin Details
        const user = await User.findById(decodedAccessToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json(new ApiError(401, "User Not Found"));
        }

        req.user = user;
        next();
    } catch (error) {
        const errorMessage = error.name === "TokenExpiredError" ? "Access Token Expired" : error?.message || "Invalid Access Token";
        return res.status(401).json(new ApiError(401, errorMessage));
    }
});

export default authenticateAndVerify;
