const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
  },
  // category: {
  //   ref: 'categories',
  //   type: Schema.Types.ObjectId,
  // },
  category: {
    type: String,
    default: true
  },
  imageSrc: {
    type: String,
    default: '',
  }
})

module.exports = mongoose.model('Products', productSchema);

