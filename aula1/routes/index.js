const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('entrou no get')
  return res.send({message: 'Get index raiz ok!'})
})

router.post('/', (req, res) => {
  console.log('entrou no post')
  return res.send({message: 'Post index raiz ok!'})
})

module.exports = router;
