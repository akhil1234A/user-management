const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1]; // Extract the actual token

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user data to the request
      return next();
    } catch (error) {
      console.error('Token verification failed:', error.message); // Log the error message
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  console.error('No token provided'); // Log if no token is provided
  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = protect;
