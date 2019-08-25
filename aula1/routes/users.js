const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/users');

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if(err) return res.send({error: 'Error select * from users'});
    return res.send(data);
  });
  
  // return res.send({message: 'Get users raiz ok!'})
})

router.post('/', (req, res) => {
  return res.send({message: 'Post users raiz ok!'})
})

router.post('/create', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.send({ error: 'Error of dados' });
  Users.findOne({email: email}, (err, data) => {
    if(err) return res.send({ error: 'Error to select findOne Users'})
    if(data) return res.send({ error: 'Users is Registered' });

    Users.create({email: email, password}, (err, data) => {
      if(err) return res.send( { error: 'Erros to try create User' });
      
      data.password = undefined;
      if(data) return res.send(data);
    })
  });
  
  //return res.send({message: 'Criado com sucesso'}) 
})

router.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.render({ error: 'Users not exist!'});

  Users.findOne({ email: email }, (err, data) => {
    if(err) return res.send({ error: 'Erros to connect and select user'});
    if(!data) return res.send({ error: 'User is not exist, no data!'});
  // becareful not compare laranja with banana
    bcrypt.compare(password, data.password, (err, same) => { 
      if (!same) return res.send({ error: 'Error password invalid' });

      data.password = undefined;
      return res.send(data);
    });
  }).select('+password'); // obrigation set the password
});

module.exports = router;
