const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  passout: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  state: {
    type: String,
    required: false,
  },

  message: {
    type: String,
    required: false,
    
  },
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
