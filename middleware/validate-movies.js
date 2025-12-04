const validator = require('../helpers/validate');

const saveMovies = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    genre: 'required|string',
    year: 'required|string',
    rating: 'required|string',
    director: 'required|string',
    duration: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovies
};