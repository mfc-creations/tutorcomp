const mongoose = require("mongoose");

const Enquiry = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  genuine: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Enquiries", Enquiry);
