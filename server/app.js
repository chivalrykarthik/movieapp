const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const clientPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(clientPath));

const routes = require('./routes');
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//  Connect all our routes to our application
app.disable('etag');
app.use('/', routes);
app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;