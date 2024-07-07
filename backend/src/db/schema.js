const mongoose = require("mongoose");

exports.User = mongoose.model(
  "User",
  new mongoose.Schema({ email: String, password: String })
);

exports.Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      available: Boolean,
      price: Number,
      quantity: Number,
      image_url: String,
      vendor: String,
    },
    { timestamps: true }
  )
);
