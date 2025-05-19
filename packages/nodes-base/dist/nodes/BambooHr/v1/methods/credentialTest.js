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
  bambooHrApiCredentialTest: () => bambooHrApiCredentialTest
});
module.exports = __toCommonJS(credentialTest_exports);
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const { subdomain, apiKey } = credentials;
  const options = {
    method: "GET",
    auth: {
      username: apiKey,
      password: "x"
    },
    url: `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/directory`
  };
  return await this.helpers.request(options);
}
async function bambooHrApiCredentialTest(credential) {
  try {
    await validateCredentials.call(this, credential.data);
  } catch (error) {
    return {
      status: "Error",
      message: "The API Key included in the request is invalid"
    };
  }
  return {
    status: "OK",
    message: "Connection successful!"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bambooHrApiCredentialTest
});
//# sourceMappingURL=credentialTest.js.map