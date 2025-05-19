"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  configureTransport: () => configureTransport,
  smtpConnectionTest: () => smtpConnectionTest
});
module.exports = __toCommonJS(utils_exports);
var import_nodemailer = require("nodemailer");
function configureTransport(credentials, options) {
  const connectionOptions = {
    host: credentials.host,
    port: credentials.port,
    secure: credentials.secure
  };
  if (credentials.secure === false) {
    connectionOptions.ignoreTLS = credentials.disableStartTls;
  }
  if (typeof credentials.hostName === "string" && credentials.hostName) {
    connectionOptions.name = credentials.hostName;
  }
  if (credentials.user || credentials.password) {
    connectionOptions.auth = {
      user: credentials.user,
      pass: credentials.password
    };
  }
  if (options.allowUnauthorizedCerts === true) {
    connectionOptions.tls = {
      rejectUnauthorized: false
    };
  }
  return (0, import_nodemailer.createTransport)(connectionOptions);
}
async function smtpConnectionTest(credential) {
  const credentials = credential.data;
  const transporter = configureTransport(credentials, {});
  try {
    await transporter.verify();
    return {
      status: "OK",
      message: "Connection successful!"
    };
  } catch (error) {
    return {
      status: "Error",
      message: error.message
    };
  } finally {
    transporter.close();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureTransport,
  smtpConnectionTest
});
//# sourceMappingURL=utils.js.map