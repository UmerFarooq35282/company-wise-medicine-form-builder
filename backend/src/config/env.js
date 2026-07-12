import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
    PORT: port({ default: 5000 }),
    NODE_ENV: str({
        choices: ["development", "production"],
        default: "development"
    }),
    MONGO_URI: str()
});

export default env;