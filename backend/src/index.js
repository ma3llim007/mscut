/* eslint-disable no-process-exit */
/* eslint-disable no-console */
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();
connectDB()
    .then(() => {
        if (!process.env.PORT) {
            console.error("🚨 ERROR: PORT environment variable is not defined!");
            process.exit(1); // Exit the process if PORT is missing
        }

        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is Running at PORT : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("💀 MONGODB CONNECTION FAILED !!! ", error.message);
    });
