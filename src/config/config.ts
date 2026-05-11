import path from "path";

import dotenv from "dotenv";

dotenv.config({path:path.resolve(process.cwd(), ".env")});

const config = {
    port : process.env.PORT
}

export default config;