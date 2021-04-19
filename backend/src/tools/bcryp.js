"use strict";
const bcrypt = require("bcryptjs");

const Crypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const Compare = (Digitada, Atual) => {
  if (!bcrypt.compareSync(Digitada, Atual)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  Crypt,
  Compare,
};
