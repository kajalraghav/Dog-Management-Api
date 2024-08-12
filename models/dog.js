const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  url: {type:String}
});

module.exports = mongoose.model('Dog', dogSchema);
