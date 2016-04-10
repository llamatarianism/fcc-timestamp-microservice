'use strict';

const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('index', {
    date: moment().format('MMMM D, YYYY'),
    unix: moment().format('x')
  })
});

app.get('/search', (req, res) => {
  res.redirect(`/${req.query.searchinput}`);
});

app.get('/:query', (req, res) => {
  const date = req.params.query;
  
  let dateObject = {
    unixtime: null,
    natural: null
  };
  
  if (isNaN(date)) {
    const formatNatural = moment(date, 'MMMM D, YYYY').format('x');
    if (formatNatural !== 'Invalid date') {
      dateObject.unixtime = parseInt(formatNatural);
      dateObject.natural = date;
    }
  } else {
    const formatUnix = moment(date, 'x').format('MMMM D, YYYY');
    if (formatUnix !== 'Invalid date') {
      dateObject.unixtime = parseInt(date);
      dateObject.natural = formatUnix;
    }
  }
  
  res.json(dateObject);
});

app.listen(process.env.PORT);
