const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/users');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.send({ error: 'Error select * from users' });
  }
  
  // Users.find({}, (err, data) => {
  //   if(err) return res.send({error: 'Error select * from users'});
  //   return res.send(data);
  // });
  
  // return res.send({message: 'Get users raiz ok!'})
});

router.post('/', (req, res) => {
  return res.send({ message: 'Post users raiz ok!' });
});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: 'Insuficient data' });

  try {
    const userExist = await Users.findOne({ email });
    if (userExist) return res.send({ error: 'Error, userExist is true' });

    const newUser = await Users.create({ email, password });
    newUser.password = undefined;
    return res.send(newUser);
  } catch (err) {
    return res.send({ error: 'Users is Registered' });
  }
  
  // if(!email || !password) return res.send({ error: 'Error of dados' });

  // Users.findOne({email: email}, (err, data) => {
  //   if(err) return res.send({ error: 'Error to select findOne Users'})
  //   if(data) return res.send({ error: 'Users is Registered' });

  //   Users.create({email: email, password}, (err, data) => {
  //     if(err) return res.send( { error: 'Erros to try create User' });
      
  //     data.password = undefined;
  //     if(data) return res.send(data);
  //   })

  // });
  
  //return res.send({message: 'Criado com sucesso'}) 
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: 'Insuficient data1' });

  try {
    const userExist = await Users.findOne({ email }).select('+password'); //obrigation set the password of BD;  
    if (!userExist) return res.send({ error: 'User is not exist!' });

    const pass_ok = await bcrypt.compare(password, userExist.password);
    if (!pass_ok) return res.send({ error: 'Error password invalid' });

    userExist.password = undefined;
    return res.send(userExist);
    
  } catch (err) {
    if (err) return res.send({ error: 'Error to connect and select user' });
  }
  
  // Users.findOne({ email: email }, (err, data) => {
  //   if(err) return res.send({ error: 'Error to connect and select user'});
  //   if(!data) return res.send({ error: 'User is not exist, no data!'});
  // // becareful not compare laranja with banana
  //   bcrypt.compare(password, data.password, (err, same) => { 
  //     if (!same) return res.send({ error: 'Error password invalid' });

  //     data.password = undefined;
  //     return res.send(data);
  //   });
  // }).select('+password'); // obrigation set the password of BD

});

module.exports = router;
