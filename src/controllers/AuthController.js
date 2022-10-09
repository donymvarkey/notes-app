const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const returnResponse = require("../utils/response/ResponseHandler");
const { hashPassword, comparePassword } = require("../utils/utils");

const register = async (req, res, next) => {
  const { firstName, lastName, address, email, password } = req.body;

  if (!firstName || !lastName || !email || !address || !password) {
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

    const user = new User({ email, password: hashedPassword });
    const u = await user.save();

    const profile = new UserProfile({
      firstName,
      lastName,
      address,
      userid: u._id,
    });
    const p = await profile.save();

    if (u && p) {
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
      userid: isUserExists._id,
      profileId: profile._id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      address: profile.address,
      email: isUserExists.email,
    };

    const token = jwt.sign(signingData, process.env.SIGNATURE);

    returnResponse({
      code: 200, msg: "Login successful", data: {
        access_token: token
      }
    }, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
