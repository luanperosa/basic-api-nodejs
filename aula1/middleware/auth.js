const jws = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token_header = req.headers.auth;
  if (!token_header) return res.send({ error: "Failed autentication, not set token!" });

  jws.verify(token_header, 'password_banana', (err, decoded) => {
    if(err) return res.send({ error: 'Failed autentication, token invalid!' });
    res.locals.auth_data = decoded;
    return next();
  });
};

module.exports = auth;