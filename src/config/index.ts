import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development'

interface Config {
    PORT: number;
    JWT_SECRET: string;
    STRIPE: {
        SECRET_KEY: string;
        WEBHOOK_SECRET: string;
    };
    DOMAIN: string;
    NODE_ENV: string;
    PROD: boolean;
    DEV: boolean;
    STAGE: boolean;
    origin: string;
}

const config: Config = {
    PORT: +(process.env.PORT || "3000"),
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    NODE_ENV,
    STRIPE: {
        SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
        WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
    },
    DOMAIN: process.env.DOMAIN || "localhost:3000",
    PROD: NODE_ENV === "production",
    DEV: NODE_ENV === "development",
    STAGE: NODE_ENV === "stage",
    origin: process.env.ALLOWED_ORIGIN || "*",
};

export default config;
