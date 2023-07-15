const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidName = function (name) {
  const regexName = /^[a-zA-Z ]+$/;
  return regexName.test(name)
}

const isValidphoneNo = function (name) {
  const regexName = /^[0-9]\d{9}$/;
  return regexName.test(name)
}

const isValidEmail = function (name) {
  const regexName = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return regexName.test(name)
}

const isValidPassword = function (name) {
  const regexName = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
  return regexName.test(name)
}

const isdescription = function (name) {
  const regexName = /[a-zA-Z0-9 ]*$/;
  return regexName.test(name)
}

module.exports = { isValid, isValidName, isValidphoneNo, isValidEmail, isValidPassword, isdescription }