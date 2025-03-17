import mongoose, { Schema } from "mongoose";

const urlScheme = new Schema(
    {
        originalUrl: {
            type: String,
            required: [true, "Original Url Is Required"],
        },
        shortUrl: {
            type: String,
            required: [true, "Short Url Is Required"],
        },
        customUrl: {
            type: String,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Is Required"],
        },
        title: {
            type: String,
            required: [true, "Title Is Required"],
        },
        qrCode: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Url = mongoose.model("Url", urlScheme);
