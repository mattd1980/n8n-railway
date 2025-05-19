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
  googleApiCredentialTest: () => googleApiCredentialTest
});
module.exports = __toCommonJS(credentialTest_exports);
var import_GenericFunctions = require("../../../GenericFunctions");
async function googleApiCredentialTest(credential) {
  try {
    const tokenRequest = await import_GenericFunctions.getGoogleAccessToken.call(this, credential.data, "sheetV2");
    if (!tokenRequest.access_token) {
      return {
        status: "Error",
        message: "Could not generate a token from your private key."
      };
    }
  } catch (err) {
    return {
      status: "Error",
      message: `Private key validation failed: ${err.message}`
    };
  }
  return {
    status: "OK",
    message: "Connection successful!"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiCredentialTest
});
//# sourceMappingURL=credentialTest.js.map