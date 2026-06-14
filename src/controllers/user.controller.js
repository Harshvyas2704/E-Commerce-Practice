const ApiResponse = require("../utility/ApiResponse.js");
const ApiError = require("../utility/ApiError.js");
const User = require("../models/user.model.js");
const {
  validateUserRegisterRequest,
  validateUserLoginRequest,
  validateChangePasswordRequest,
} = require("../utility/validator.js");

async function registerUserController(req, res) {
  try {
    const { firstName, lastName, email, mobileNo, avatar } = req.body;

    const { error, message } = validateUserRegisterRequest(req.body);

    if (error) {
      return res.status(401).json(new ApiError(401, message));
    }

    const isUserAlreadyExist = await isUserExist(email, mobileNo);
    if (isUserAlreadyExist) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            `User with email ${email} or mobile ${mobileNo} is already exist`,
          ),
        );
    }
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobileNo,
      avatar,
      password: req.body.password,
    });

    if (!newUser) {
      return res
        .status(401)
        .json(new ApiError(401, "Error while creating user"));
    }

    const { password, refreshToken, ...userResponse } = newUser.toObject();

    return res
      .status(200)
      .json(
        new ApiResponse(true, 200, userResponse, "User create successfully"),
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    const { error, message } = validateUserLoginRequest(req.body);
    if (error) {
      return res.status(401).json(new ApiError(401, message));
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid credentials"));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json(new ApiError(401, "Invalid credentials"));
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userResponse = await User.findById(user._id).select(
      "-password -refreshToken",
    );
    const safeUser = userResponse.toObject();

    safeUser.accessToken = accessToken;
    safeUser.refreshToken = refreshToken;

    return res
      .status(200)
      .json(new ApiResponse(true, 200, safeUser, "Login Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(401, "Server error while login"));
  }
}

async function forgetPasswordController(req, res) {
  try {
    /**
     * TODO
     * take email from user and send email for resetting password via SMTP.
     */
    console.log(req.user);
  } catch (error) {}
}

async function getUserProfileController(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json(new ApiError(401, "Error while fetching profile data"));
    }
    const { createdAt, updatedAt, ...userResponse } = user;
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          200,
          userResponse,
          "User profile fetch successfully",
        ),
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error while getting user profile"));
  }
}

async function changePasswordController(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const { error, message } = validateChangePasswordRequest(
      oldPassword,
      newPassword,
    );
    if (error) {
      return res.status(401).json(new ApiError(401, message));
    }
    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      return res.status(401).json(new ApiError(401, "User not found"));
    }

    const isOldPasswordValid = await findUser.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      return res
        .status(401)
        .json(new ApiError(401, "Old password in incorrect"));
    }
    findUser.password = newPassword;
    await findUser.save();
    return res
      .status(200)
      .json(new ApiResponse(true, 200, null, "Password change successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error while changing password"));
  }
}

async function logoutController(req, res) {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, { refreshToken: null });
    return res
      .status(200)
      .json(new ApiResponse(true, 200, null, "Logout successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Server error while logout"));
  }
}

async function isUserExist(email = "", mobileNo = "") {
  try {
    const user = await User.findOne({ $or: [{ email }, { mobileNo }] });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    throw new ApiError(500, "Error while checking existing user");
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new ApiError(500, "Error while getting user by email");
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  forgetPasswordController,
  getUserProfileController,
  changePasswordController,
  logoutController,
};
