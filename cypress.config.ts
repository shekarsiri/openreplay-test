import {defineConfig} from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL,
        env: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        },
        setupNodeEvents(on, config) {

        },
    },
});
