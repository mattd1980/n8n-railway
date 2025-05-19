"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  connect: () => connect,
  destroy: () => destroy,
  execute: () => execute,
  getConnectionOptions: () => getConnectionOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_pick = __toESM(require("lodash/pick"));
const commonConnectionFields = [
  "account",
  "database",
  "schema",
  "warehouse",
  "role",
  "clientSessionKeepAlive"
];
const getConnectionOptions = (credential) => {
  const connectionOptions = (0, import_pick.default)(credential, commonConnectionFields);
  if (credential.authentication === "keyPair") {
    connectionOptions.authenticator = "SNOWFLAKE_JWT";
    connectionOptions.privateKey = credential.privateKey;
  } else {
    connectionOptions.username = credential.username;
    connectionOptions.password = credential.password;
  }
  return connectionOptions;
};
async function connect(conn) {
  return await new Promise((resolve, reject) => {
    conn.connect((error) => error ? reject(error) : resolve());
  });
}
async function destroy(conn) {
  return await new Promise((resolve, reject) => {
    conn.destroy((error) => error ? reject(error) : resolve());
  });
}
async function execute(conn, sqlText, binds) {
  return await new Promise((resolve, reject) => {
    conn.execute({
      sqlText,
      binds,
      complete: (error, _, rows) => error ? reject(error) : resolve(rows)
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect,
  destroy,
  execute,
  getConnectionOptions
});
//# sourceMappingURL=GenericFunctions.js.map