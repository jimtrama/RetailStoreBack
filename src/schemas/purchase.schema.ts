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
    email: {
      type: String,
      required: [true, "Error email is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("purchase", purchaseSchema);
