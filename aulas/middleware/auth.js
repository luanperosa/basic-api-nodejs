const jws = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
  const token_header = req.headers.auth;
  if (!token_header) return res.status(401).send({ error: "Failed autentication, not set token!" });

  jws.verify(token_header, config.jwt_pass, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Failed autentication, token invalid!' });
    res.locals.auth_data = decoded;
    return next();
  });
};

module.exports = auth;