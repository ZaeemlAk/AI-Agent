import { Router } from "express";
import { getConnectionState } from "../config/db.js";

const router = Router();

// GET /api/health
// Simple liveness check. Later phases add readiness checks
// (e.g. can we reach the LLM provider) without touching this route's contract.
router.get("/", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];

  res.status(200).json({
    success: true,
    message: "Server is running",
    data: {
      uptimeSeconds: Math.round(process.uptime()),
      db: dbStates[getConnectionState()] || "unknown",
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
