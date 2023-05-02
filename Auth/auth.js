const jwt = require('jsonwebtoken');

const JWT_SECRET = "12345678";

exports.tokenAuth=(req, res, next)=> {
  const token =req.header('Authorization');
//   console.log(token);
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token,JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}
