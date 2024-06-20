const mongoose = require("mongoose");
const User = require("./model/User");
const express = require("express");
const bodyParser = require("body-parser");
const Blog = require("./model/Blog");
const connectDB = require("./conifg/db");
connectDB();
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/blogs", blogRoutes);
app.use("/auth", authRoutes);

const corsOptions = {
  origin: "http://192.168.1.144:5174",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  preflightcontinue: true,
};

app.use(cors(corsOptions));
app.all("*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
});
app.use(cookieParser());

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
