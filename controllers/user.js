const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");

const loginAdmin = asyncWrapper(async (req, res, next) => {
  const { userName, password } = req.body;

  if (userName !== process.env.USER_NAME || password !== process.env.PASSWORD) {
    return next(createCustomError(`Invalid username or password!`, 404));
  }

  res.status(200).json({ login: true });
});

module.exports = {
  loginAdmin,
};
