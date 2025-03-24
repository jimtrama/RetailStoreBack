import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    totalAmount: {
      type: Number,
      require:true,
      default:0,
    },
    products: {
      type: Array<String>,
    },
    eta: {
      type: Date,
      default:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + Math.floor(Math.random()*3) + 1)
    },
    email: {
      type: String,
      required: [true, "Error email is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("purchase", purchaseSchema);
