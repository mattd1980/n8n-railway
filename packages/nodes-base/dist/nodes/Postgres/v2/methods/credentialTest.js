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
var credentialTest_exports = {};
__export(credentialTest_exports, {
  postgresConnectionTest: () => postgresConnectionTest
});
module.exports = __toCommonJS(credentialTest_exports);
var import_transport = require("../../transport");
async function postgresConnectionTest(credential) {
  const credentials = credential.data;
  let connection;
  try {
    const { db } = await import_transport.configurePostgres.call(this, credentials, {});
    connection = await db.connect();
  } catch (error) {
    let message = error.message;
    if (error.message.includes("ECONNREFUSED")) {
      message = "Connection refused";
    }
    if (error.message.includes("ENOTFOUND")) {
      message = "Host not found, please check your host name";
    }
    if (error.message.includes("ETIMEDOUT")) {
      message = "Connection timed out";
    }
    return {
      status: "Error",
      message
    };
  } finally {
    if (connection) {
      await connection.done();
    }
  }
  return {
    status: "OK",
    message: "Connection successful!"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postgresConnectionTest
});
//# sourceMappingURL=credentialTest.js.map