function validateUserRegisterRequest(data) {
  const { firstName, lastName, email, password, mobileNo } = data;

  if (!firstName) {
    return { error: true, message: "First name is required" };
  }
  if (!lastName) {
    return { error: true, message: "Last name is required" };
  }
  if (!email) {
    return { error: true, message: "Email is required" };
  }
  if (!password) {
    return { error: true, message: "Password is required" };
  }
  if (!mobileNo) {
    return { error: true, message: "Mobile number is required" };
  }

  return { error: false, message: "" };
}

function validateUserLoginRequest(data) {
  const { email, password } = data;
  if (!email) {
    return { error: true, message: "Email is required" };
  }
  if (!password) {
    return { error: true, message: "Password is required" };
  }

  return { error: false, message: "" };
}

function validateChangePasswordRequest(oldPassword, newPassword) {
  if (!oldPassword) {
    return { error: true, message: "Old password is required" };
  }
  if (!newPassword) {
    return { error: true, message: "New password is required" };
  }

  return { error: false, message: "" };
}

module.exports = {
  validateUserRegisterRequest,
  validateUserLoginRequest,
  validateChangePasswordRequest,
};
