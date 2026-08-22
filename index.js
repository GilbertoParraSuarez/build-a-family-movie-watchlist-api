import express from "express";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import watchlistRouter from "./routes/watchlist.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.get("/", (_req, res) => res.send("Family Movie Watchlist API"));
app.use("/api/auth", authRouter);
app.use("/api/watchlist", watchlistRouter);

app.listen(PORT, () => console.log("Server running on port " + PORT + "..."));
