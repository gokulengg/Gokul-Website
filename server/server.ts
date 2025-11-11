import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import quoteRouter from "./routes/quote";

// Load env (only in dev/local). In Vercel, envs are provided automatically.
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Basic hardening
app.disable("x-powered-by");

// Middlewares
app.use(morgan("tiny"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "development" });
});

// Handle JSON parse errors and return JSON response instead of HTML
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err && err.type === "entity.parse.failed") {
    console.warn("Invalid JSON received", err.message);
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  return next(err);
});

// Routes
app.use("/api/quote", quoteRouter);

// Start server
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
