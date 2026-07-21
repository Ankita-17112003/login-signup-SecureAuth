require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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
      sameSite: "lax",
      secure: false, 
    },
  }),
);

app.use("/api/auth", authRoutes);

app.listen(PORT,() => {
  console.log(`server is running on ${PORT}`);
});
