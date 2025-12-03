const validator = require('../helpers/validate');

const saveUsers = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email:'required|string',
    role: 'required|string',
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
  saveUsers
};