import app from "./app.js";
import env, { validateEnv } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function start() {
validateEnv();                                      
await connectDB();

const server = app.listen(env.port, () => {
console.log(`[server] NextGen AI Agent API running on port ${env.port} (${env.nodeEnv})`);
});

const shutdown = (signal) => {
console.log(`[server] Received ${signal}, shutting down gracefully...`);
server.close(() => {
console.log("[server] HTTP server closed.");
process.exit(0);
});
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start();