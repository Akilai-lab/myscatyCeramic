const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      console.log(userId)
      
      if (req.body.userId && req.body.userId !== userId) {
        console.log('ne marche pas')
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};