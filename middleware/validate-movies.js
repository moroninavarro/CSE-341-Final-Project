const validator = require('../helpers/validate');

const saveMovies = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    genre: 'required|string',
    year: 'required|integer',
    rating: 'required|number',
    director: 'required|string',
    duration: 'required|number'
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