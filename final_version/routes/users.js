const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// auxiliar functions
const createUsersToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
};

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Error select * from users' });
  }
});

router.post('/', (req, res) => {
  return res.status(200).send({ message: 'Post users raiz ok!' });
});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: 'Insuficient data' });

  try {
    const userExist = await Users.findOne({ email });
    if (userExist) return res.status(400).send({ error: 'Error, userExist is true' });

    const newUser = await Users.create({ email, password });
    newUser.password = undefined;
    
    return res.status(201).send({ newUser, token: createUsersToken(newUser.id) }); //status 201 http user create

  } catch (err) {
    return res.status(500).send({ error: 'Users is Registered' });
  }
  
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: 'Insuficient data1' });

  try {
    const userExist = await Users.findOne({ email }).select('+password'); // Obrigation set the password of BD.
    if (!userExist) return res.status(400).send({ error: 'User is not exist!' });

    const pass_ok = await bcrypt.compare(password, userExist.password);
    if (!pass_ok) return res.status(401).send({ error: 'Error password invalid' });

    userExist.password = undefined;
    return res.send({ userExist, token: createUsersToken(userExist.id) });

  } catch (err) {
    if (err) return res.status(500).send({ error: 'Error to connect and select user' });
  }
});

module.exports = router;
 
/* 

200 - ok
201 - Created
202 - Accept

400 - Bad Request
401 - Unauthorized - autenticação, tem caracter temporario
403 - Forbidden - autorização tem caracter permanente
404 - Not found

500 - Internal server err
501 - Not implement - API not suport this function
503 - Service Unavailable - API executa essa operação, but indisponivel in moment


 */