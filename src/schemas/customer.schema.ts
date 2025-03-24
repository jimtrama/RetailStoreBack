import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Error first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Error first name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Error email is required"],
    },
    password: {
      type: String,
      required: [true, "Error password is required"],
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("customer", customerSchema);
