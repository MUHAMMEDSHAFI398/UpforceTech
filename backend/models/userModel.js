const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type:String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
      },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
