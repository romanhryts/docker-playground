const mongoose = require('mongoose');

class Connector {
  static mongodb(url) {
    mongoose.connect(url);
    return mongoose.connection;
  }
}

module.exports = Connector;
