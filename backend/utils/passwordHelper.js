const bcrpt = require("bcrypt");
module.exports.hashingPasswordFunction = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrpt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports.compareHashedPasswordFunction = (password, hashedPassword) => {
  return bcrpt.compare(password, hashedPassword);
};
