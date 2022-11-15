const createDoctor = require("./createDoctor");
const authenticateDoctor = require("./authenticateDoctor");
const logOutDoctor = require("./logOutDoctor");
const refreshDoctor = require("./refreshDoctor");

module.exports = {
  createDoctor: async (
    cryptographyInstance,
    dbInstance,
    DocModel,
    roles,
    docDetails
  ) =>
    createDoctor(cryptographyInstance, dbInstance, DocModel, roles, docDetails),

  authenticateDoctor: async (
    dbInstance,
    cryptographyInstance,
    jwtInstance,
    DocModel,
    docDetails
  ) =>
    authenticateDoctor(
      dbInstance,
      cryptographyInstance,
      jwtInstance,
      DocModel,
      docDetails
    ),
  logOutDoctor: async (
    dbInstance,
    refresh_token,
    DocModel,
    jwtInstance,
    refresh_token_secret
  ) =>
    logOutDoctor(
      dbInstance,
      refresh_token,
      DocModel,
      jwtInstance,
      refresh_token_secret
    ),
  refreshDoctor: async (
    dbInstance,
    jwtInstance,
    DocModel,
    refresh_token,
    refresh_token_secret
  ) =>
    refreshDoctor(
      dbInstance,
      jwtInstance,
      DocModel,
      refresh_token,
      refresh_token_secret
    ),
};
