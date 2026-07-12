import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

import companyRoutes from "./routes/company.routes.js";
import itemRoutes from "./routes/item.routes.js";
import organizationRoutes from "./routes/organization.routes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));




app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "UP",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

app.use("/api/organizations", organizationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/items", itemRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;