const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config/config.env" });

connectDB();

const CheckEnquiry = require("./routes/enquiry");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1/enquiry", CheckEnquiry);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
