const validator = require('../helpers/validate');

const saveReviews = (req, res, next) => {
  const validationRule = {
    movieId: 'required|string',
    userId: 'required|string',
    rating: 'required|string',
    reviewText: 'required|string'
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
  saveReviews
};