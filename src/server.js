'use strict';
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

// app.use(bodyParser.urlencoded());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());


app.get('/users', function(req, res) {
  const data = fs.readFileSync('src/users.json', 'utf8');
  res.send(data);
});

app.post('/user-register', function(req, res) {
  console.log('Пришли данные с клиента', req.body);

  const data = JSON.parse(fs.readFileSync('src/users.json', 'utf8'));
  data.push(JSON.parse(req.body));

  fs.writeFile('src/users.json', JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  res.send('Данные добавлены');
});

app.listen(3000, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 3000')
});