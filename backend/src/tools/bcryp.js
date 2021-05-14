"use strict";
const bcrypt = require("bcryptjs");

const Crypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const Compare = (nova, atual) => {
  if (!bcrypt.compareSync(nova, atual)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  Crypt,
  Compare,
};
