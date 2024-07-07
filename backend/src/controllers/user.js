const UserService = require("../services/user");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Required item(s) missing",
    });
  }

  const userInfo = await UserService.getUserByEmail({ email });

  if (userInfo) {
    return res.status(400).json({
      status: "error",
      message: "This email has been used already",
    });
  }

  // create new user
  try {
    await UserService.createUser({ email, password });
    return res.status(200).json({
      status: "success",
      message: "Successfully created account",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Required item(s) missing",
    });
  }

  const userInfo = await UserService.getUserByEmail({ email });

  if (!userInfo) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const isValid = await UserService.isValidPassword({
    password: password,
    hash: userInfo.password,
  });

  if (!isValid) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  try {
    const token = UserService.generateToken({
      email: email,
      user_id: userInfo._id,
    });
    return res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: token,
      email: email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
