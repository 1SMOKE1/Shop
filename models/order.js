const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cardLines: {
    type: Array,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  shiped: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Orders', orderSchema);
