const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost/apis-nodejs';
const options = { reconnectTries: Number.MAX_VALUE, reconnectIinterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Error to conect data base ' + err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Aplication disconnect from database')
})

mongoose.connection.on('connected', () => {
  console.log('Aplication connected from database')
})

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//require of routes
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(3000);

module.exports = app;

// codigo utilizado na primeira video aula
// app.get('/', (req, res) => {
//   let objet = req.query;
//   const { nome, idade} = objet;
//   return res.send({message: `Tudo ok com o metodo GET. Seu nome é ${nome}, idade ${idade}`})
// });

// app.post('/', (req, res) => {
//   return res.send({message: 'Tudo ok com metodo Post'})
// })
