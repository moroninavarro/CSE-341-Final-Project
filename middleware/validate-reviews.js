const validator = require('../helpers/validate');

const saveReviews = (req, res, next) => {
  const validationRule = {
    movieId: 'required|string|size:24|regex:/^[A-Za-z0-9]{24}$/',
    userId: 'required|string|size:24|regex:/^[A-Za-z0-9]{24}$/',
    rating: 'required|number',
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