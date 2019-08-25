const express = require('express');
const router = express.Router();
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

module.exports = router;
