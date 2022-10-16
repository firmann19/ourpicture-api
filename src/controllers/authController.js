const { validationResult } = require("express-validator");
const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  // Validate payload
  const errors = validationResult(req.body);

  if (!errors.isEmpty())
    return res.status(400).jsend.fail({
      code: 400,
      message: null,
      error_validation: errors.array(),
    });

  //Panggil serivce
  const { email, username, password } = req.body;

  const registerResponse = await authService.register({
    email,
    username,
    password,
    profile_picture: req.file,
  });

  if (!registerResponse.status)
    return res.status(registerResponse.error.code).jsend.fail({
      code: registerResponse.error.code,
      message: registerResponse.error.message,
      error_validation: registerResponse.error_validation,
    });

  return res.jsend.success({
    code: 201,
    message: "User berhasil terdaftar",
    created_user: registerResponse.createdUser,
    error_validation: [],
  });
};

exports.login = async (req, res, next) => {
  // Validate payload
  const errors = validationResult(req.body);

  if (!errors.isEmpty())
    return res.status(400)
  const loginResponse = await authService.login({
    email,
    password,
  });

  if (!loginResponse.status)
    return res.status(loginResponse.error.code).jsend.fail({
      code: loginResponse.error.code,
      message: loginResponse.error.message,
      error_validation: loginResponse.error_validation,
    });

  return res.jsend.success({
    code: 200,
    message: "User berhasil login",
    token: loginResponse.token,
    error_validation: [],
  });
};

exports.getLoggedUser = async (req, res, next) => {
  return res.jsend.success({
    code: 200,
    message: "",
    user: req.user,
    error_validation: [],
  });
};
