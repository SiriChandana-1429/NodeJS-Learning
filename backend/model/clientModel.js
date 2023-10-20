const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  insuranceType: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", clientSchema);
