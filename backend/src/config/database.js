import mongoose from "mongoose";

const connectDatabase = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database Connection Failed");

        console.error(error.message);

        process.exit(1);
    }
};

export default connectDatabase;