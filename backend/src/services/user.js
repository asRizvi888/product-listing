const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../db/schema");

exports.getUserByEmail = async (data) => {
  const { email } = data;

  const userInfo = await User.findOne({ email });
  return userInfo;
};

exports.createUser = async (data) => {
  const { email, password } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
};

exports.generateToken = (data) => {
  const { email, user_id } = data;

  const token = jwt.sign({ email, user_id }, process.env.JWT_SECRET);
  return token;
};

exports.isValidPassword = async (data) => {
  const { password, hash } = data;

  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};
