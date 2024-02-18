import mongoose from "mongoose";

const currencySettingsSchema = new mongoose.Schema({
  serviceFee: { type: Number, required: true },
  conversionRate: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
});

const CurrencySettings = mongoose.model(
  "CurrencySettings",
  currencySettingsSchema
);

export default CurrencySettings;
