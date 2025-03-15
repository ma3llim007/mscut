/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import { connect } from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error("🚨 ERROR: MONGO_URL environment variable is not defined!");
        process.exit(1); // Exit the process if MONGO_URL is missing
    }
    try {
        const connectionInstance = await connect(process.env.MONGO_URL);
        console.log(`🛠️  MONGODB Connected! DB HOST: ${connectionInstance.connection.host} DB NAME: ${connectionInstance.connection.db.databaseName}`);
    } catch (error) {
        console.error("💀  MONGODB CONNECTION ERROR ", error.message);
        process.exit(1);
    }
};

export default connectDB;
