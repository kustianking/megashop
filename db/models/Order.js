import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    buyer: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    referenceNumber: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    products: { type: Array, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("ORDERS", ordersSchema);

export default Orders;
