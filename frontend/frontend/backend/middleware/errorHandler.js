// middleware/errorHandler.js
//
// Generic error handler. In development it prints stack, in production it hides it.

const config = require('../config/config');


function errorHandler(err, req, res, next) {


  // Log the error for debugging (could substitute a logger).
  console.error(err);


  const status = err.status || 500;


  const payload = {
    message: err.message || 'Internal Server Error'
  };


  // Only include stack in non-production.
  if (config.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }


  return res.status(status).json(payload);
}


module.exports = { errorHandler };
