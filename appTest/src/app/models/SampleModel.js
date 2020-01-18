const Mongoose = require('mongoose');

const SampleModel = new Mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
  },
  {
      timestamps: true
  }
);

module.exports = Mongoose.model('Sample', SampleModel);
