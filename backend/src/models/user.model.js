import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name Is Required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name Is Required"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email Is Required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// Hashing The Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Checking Password Is Correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: `${this.firstName} ${this.lastName}`,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
