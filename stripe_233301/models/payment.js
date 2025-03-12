const mongoose = require('mongoose');

// Modelo de pago
const PaymentSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Payment', PaymentSchema);