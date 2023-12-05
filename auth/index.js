const express = require('express');
const config = require('./src/config');
const Connector = require('./src/connector');

const app = express();

app.get('/', async (req, res) => {
  res.json({ status: 1 });
});

const startServer = () => {
  app.listen(config.PORT, () => {
    console.log(`Auth service is running on port ${config.PORT}`);
  });
}

Connector
  .mongodb(config.MONGODB_URL)
  .on('error', console.log)
  .once('open', startServer);
