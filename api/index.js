const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config');
const Connector = require('./src/connector');

const app = express();

const DB = {
  post: {
    _model: null,
    name: 'Post',
    schema: new mongoose.Schema({ title: String }),
    model() {
      this._model ||= mongoose.model(this.name, this.schema);
      return this._model;
    }
  }
}

app.get('/:model', async (req, res) => {
  const entity = DB[req.params.model];
  if (!entity) return;
  const [data] = await entity.model().find();
  res.json(data);
});

const startServer = () => {
  app.listen(config.PORT, () => {
    console.log(`API is running on port ${config.PORT}`);
  });
}

Connector
  .mongodb(config.MONGODB_URL)
  .on('error', console.log)
  .once('open', startServer);
