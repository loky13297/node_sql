const jwt = require("jsonwebtoken");

const loginToken = (user) => {
  let token = jwt.sign(
    { id: user?.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = { loginToken };
