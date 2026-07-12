import app from "./app.js";

import env from "./config/env.js";

import connectDatabase from "./config/database.js";

const startServer = async () => {
    try {
        await connectDatabase(env.MONGO_URI);

        const server = app.listen(env.PORT, () => {
            console.log(
                `Server running on http://localhost:${env.PORT}`
            );
        });

        const shutdown = () => {
            console.log("Gracefully shutting down...");

            server.close(() => {
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);

        process.on("SIGTERM", shutdown);

    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

startServer();