const Mongoose = require('mongoose');

const DemoModel = new Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      },
    users: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'user',
      },
  },
  {
    timestamps: true
  }
);

module.exports = Mongoose.model('Demo', DemoModel)
