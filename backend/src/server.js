import express from "express";
import "dotenv/config";
import cors from "cors";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./configs/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });
app.use("/api/notes", notesRoutes);

// Start Server and Connect Database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port: ${PORT}`);
});
