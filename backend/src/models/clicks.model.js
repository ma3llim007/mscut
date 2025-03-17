import mongoose, { Schema } from "mongoose";

const clicksScheme = new Schema(
    {
        urlId: {
            type: Schema.Types.ObjectId,
            ref: "Url",
            required: [true, "Url Id Is Required"],
        },
        city: {
            type: String,
            ref: "Url",
            required: [true, "City Is Required"],
        },
        device: {
            type: String,
            required: [true, "Device Is Required"],
        },
        country: {
            type: String,
            required: [true, "Country Is Required"],
        },
    },
    { timestamps: true }
);

export const Click = mongoose.model("Click", clicksScheme);
