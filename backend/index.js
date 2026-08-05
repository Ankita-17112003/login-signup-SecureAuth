require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// ✅ Allow both local development and production frontend
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // production Vercel URL (set this in Render dashboard)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});