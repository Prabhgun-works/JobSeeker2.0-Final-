// middleware/roleMiddleware.js
//
// Simple role guard. Usage: requireRole('recruiter')

function requireRole(role) {
  return function (req, res, next) {

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }


    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }


    return next();
  };
}


module.exports = { requireRole };
