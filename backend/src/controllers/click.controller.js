import { isValidObjectId } from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../utils/api.utils.js";
import { Click } from "../models/clicks.model.js";
import { Url } from "../models/urls.model.js";

const createUrlClicks = asyncHandler(async (req, res) => {
    const { urlId, city, device, country } = req.body;
    if (![urlId, city, device, country].every((field) => field?.trim())) {
        return res.status(429).json(new ApiError(429, "All fields are required: Url ID, City, Device, and Country."));
    }

    if (!isValidObjectId(urlId)) {
        return res.status(404).json(new ApiError(404, "Invalid Url Id"));
    }
    const url = await Url.findById(urlId);
    if (!url) {
        return res.status(404).json(new ApiError(404, "Url Not Found!"));
    }
    
    try {
        await Click.create({
            urlId,
            city,
            device,
            country,
        });
        return res.status(201).json(new ApiResponse(201, {}, "Url Click Created Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Adding Url Clicks"));
    }
});

const clickByUrlId = asyncHandler(async (req, res) => {
    const { urlId } = req.params;
    if (!urlId?.trim()) {
        return res.status(429).json(new ApiError(429, "Url Id Fields Is Required"));
    }

    if (!isValidObjectId(urlId)) {
        return res.status(404).json(new ApiError(404, "Invalid Url Id"));
    }

    const urlClicks = await Click.find({ urlId });
    return res.status(200).json(new ApiResponse(200, urlClicks, "Url Clicks Fetch Successfully"));
});

export { createUrlClicks, clickByUrlId };
