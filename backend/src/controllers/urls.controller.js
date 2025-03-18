import { isValidObjectId } from "mongoose";
import { Url } from "../models/urls.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/api.utils.js";
import { nanoid } from "nanoid";
import { toDataURL } from "qrcode";
import { Click } from "../models/clicks.model.js";
import { UAParser } from "ua-parser-js";

const createUrl = asyncHandler(async (req, res) => {
    const { originalUrl, customUrl, title } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(400).json(new ApiError(400, "User Is Required"));
    }
    if (!originalUrl?.trim() || !title?.trim()) {
        return res.status(422).json(new ApiError(422, "Original Url And Title Are Request"));
    }

    //  Short URL
    const shortUrl = nanoid(6);
    let fullShortUrl = `${process.env.FRONTEND_HOST}/${shortUrl}`;

    try {
        // Check User's Url Count
        const userUrlCount = await Url.countDocuments({ userId: user._id });
        if (userUrlCount >= 15) {
            return res.status(403).json(new ApiError(403, "You Can Only Create Up To 15 Short URLs"));
        }
        
        // Check If the custom URL Already Exists
        if (customUrl) {
            const existingCustomUrl = await Url.findOne({ customUrl });
            if (existingCustomUrl) {
                return res.status(409).json(new ApiError(409, "Custom Url Already Exists"));
            }
            fullShortUrl = `${process.env.FRONTEND_HOST}/${customUrl}`;
        }

        // Generate QR Code
        const qrCode = await toDataURL(fullShortUrl);

        const createUrl = await Url.create({
            originalUrl,
            shortUrl,
            customUrl: customUrl ? customUrl : undefined,
            userId: user._id,
            title,
            qrCode,
        });
        return res.status(201).json(new ApiResponse(201, createUrl, "URL Created Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Generating Url"));
    }
});

const getUrlsByUserId = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json(new ApiError(400, "User Is Required"));
    }
    try {
        const urls = await Url.find({ userId: user._id }).sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, urls, "Urls Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching User URL's"));
    }
});

const deleteUrl = asyncHandler(async (req, res) => {
    const { urlId } = req.params;

    if (!urlId) {
        return res.status(422).json(new ApiError(422, "Url ID is Required"));
    }
    if (!isValidObjectId(urlId)) {
        return res.status(404).json(new ApiError(404, "Invalid Url ID"));
    }

    // Finding the Url
    const url = await Url.findById(urlId);
    if (!url) {
        return res.status(404).json(new ApiError(404, "Url Not Found"));
    }

    // Deleting Url Relative Clicks
    try {
        await Click.deleteMany({ urlId });
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Deleting Url Relative Clicks"));
    }

    const deleteUrl = await Url.deleteOne({ _id: urlId });
    if (deleteUrl.deletedCount === 0) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Deleting The Url"));
    }

    return res.status(200).json(new ApiResponse(200, {}, "Url Delete Successfully"));
});

const redirectUrl = asyncHandler(async (req, res) => {
    const { url } = req.params;
    if (!url) {
        return res.status(400).json(new ApiError(400, "Url Code Is Required"));
    }
    try {
        const redirectionUrl = await Url.findOne({
            $or: [{ customUrl: url }, { shortUrl: url }],
        }).select("originalUrl");

        if (!redirectionUrl) {
            return res.status(400).json(new ApiError(400, "Url Is Not Found!"));
        }

        return res.status(200).json(new ApiResponse(200, redirectionUrl, "Url Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Redirect Url"));
    }
});

const storeClicks = asyncHandler(async (req, res) => {
    const { urlId } = req.params;
    if (!isValidObjectId(urlId)) {
        return res.status(422).json(new ApiError(422, "Url ID is Required"));
    }

    try {
        // Detect Device Type
        const parser = new UAParser(req.headers["user-agent"]);
        const parserRes = parser.getResult();
        const device = parserRes.type || "desktop";

        const response = await fetch("https://ipapi.co/json");
        const jsonResponse = await response.json();

        await Click.create({
            urlId,
            city: jsonResponse.city,
            device: device,
            country: jsonResponse.country_name,
        });
        return res.status(200).json(new ApiResponse(200, {}, "redirecting....."));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Redirect Url"));
    }
});

const urlByUrlId = asyncHandler(async (req, res) => {
    const { urlId } = req.params;
    if (!urlId) {
        return res.status(422).json(new ApiError(422, "Url ID is Required"));
    }
    if (!isValidObjectId(urlId)) {
        return res.status(404).json(new ApiError(404, "Invalid Url ID"));
    }

    try {
        // Finding the Url
        const url = await Url.findById(urlId);
        if (!url) {
            return res.status(404).json(new ApiError(404, "Url Not Found"));
        }
        const clicks = await Click.find({ urlId: url._id });

        return res.status(200).json(new ApiResponse(200, { url, clicks: clicks?.length ? clicks : [] }, "Url And Clicks Fetched Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Url With Clicks"));
    }
});

export { getUrlsByUserId, createUrl, deleteUrl, redirectUrl, storeClicks, urlByUrlId };
