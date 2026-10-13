import dotenv from "dotenv";

dotenv.config();

const env = {
nodeEnv: process.env.NODE_ENV || "development",
port: process.env.PORT || 5000,
clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nextgen-ai-agent",

jwtSecret: process.env.JWT_SECRET || "",
jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

openAiApiKey: process.env.OPENAI_API_KEY || "",
openAiBaseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
};

export default env;

export function validateEnv() {
if (!env.jwtSecret || env.jwtSecret.length < 32) {
console.error(
"[env] JWT_SECRET is missing or shorter than 32 characters.\n" +
"      Generate one with:\n" +
"      node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\""
);
process.exit(1);
}
}