const Mongoose = require('mongoose');

const LogsModel = new Mongoose.Schema(
  {
    integrationKey: {
      type: String,
      require: true,
      },
    originUrl: {
      type: String,
      require: true,
      },
    data: {
      type: String,
      require: true,
      },
    weight: {
      type: Number,
      require: true,
      },
    eventType: {
      type: String,
      require: true,
      },
    externalResponsableId: {
      type: String,
      require: true,
      },
  },
  {
    timestamps: true
  }
);

module.exports = Mongoose.model('Logs', LogsModel)