const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const returnResponse = require("../utils/response/ResponseHandler");
const { hashPassword, comparePassword } = require("../utils/utils");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return returnResponse(
      { code: 400, msg: "Please enter all data", data: null },
      res
    );
  }
  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return returnResponse(
        { code: 400, msg: "User already exists", data: null },
        res
      );
    }

    const hashedPassword = hashPassword(password);

    const user = new User({ name, email, password: hashedPassword });
    const data = await user.save();

    if (data) {
      return returnResponse(
        { code: 200, msg: "User registered successfully.", data: null },
        res
      );
    } else {
      return returnResponse(
        { code: 400, msg: "User not registered.", data: null },
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return returnResponse(
      { code: 400, msg: "Please enter all data", data: null },
      res
    );
  }
  try {
    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
      return returnResponse(
        { code: 400, msg: "User not found.", data: null },
        res
      );
    }

    if (!comparePassword(password, isUserExists.password)) {
      return returnResponse(
        { code: 400, msg: "Invalid credentials", data: null },
        res
      );
    }

    const profile = await UserProfile.findOne({ userid: isUserExists._id });

    const signingData = {
      user_id: isUserExists._id,
    };

    const token = jwt.sign(signingData, process.env.SIGNATURE);

    returnResponse(
      {
        code: 200,
        msg: "Login successful",
        data: {
          access_token: token,
          user: {
            email: isUserExists?.email,
            user_id: isUserExists?._id,
            name: isUserExists?.name,
          },
        },
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
