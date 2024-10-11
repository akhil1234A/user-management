const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(401).json({ message: 'Not authorized as admin' });
};

module.exports = admin;
