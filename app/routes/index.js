'use strict';

const express = require('express');
const urlParser = require('url');
const app = express();

app.listen(8080);

app.get('/', (req, res) => {
  const parsedUrl = urlParser.parse(req.url, true);
});