require("dotenv").config();

const express = require("express");
const connectDB = require("./connection.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//importing my routes
const authRoutes = require("./routes/auth.js");
const urlRoutes = require("./routes/url.js");

// Connect to MongoDB
connectDB();

//using my routes
app.use("/", authRoutes);
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
