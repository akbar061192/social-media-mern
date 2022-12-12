import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ msg: 'Un-authorized' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
};

export { verifyToken };
