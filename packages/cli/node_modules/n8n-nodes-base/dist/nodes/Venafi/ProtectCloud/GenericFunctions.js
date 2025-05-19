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
  encryptPassphrase: () => encryptPassphrase,
  venafiApiRequest: () => venafiApiRequest,
  venafiApiRequestAllItems: () => venafiApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var nacl_factory = __toESM(require("js-nacl"));
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function venafiApiRequest(method, resource, body = {}, qs = {}, option = {}) {
  const operation = this.getNodeParameter("operation", 0);
  const credentials = await this.getCredentials("venafiTlsProtectCloudApi");
  const region = credentials.region ?? "cloud";
  const options = {
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    method,
    body,
    qs,
    uri: `https://api.venafi.${region}${resource}`,
    json: true
  };
  if (Object.keys(option).length) {
    Object.assign(options, option);
  }
  if (operation === "download") {
    if (!resource.endsWith("keystore")) {
      delete options.headers.Accept;
      delete options.headers["content-type"];
    }
  }
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestWithAuthentication.call(
      this,
      "venafiTlsProtectCloudApi",
      options
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function venafiApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await venafiApiRequest.call(this, method, endpoint, body, query);
    endpoint = (0, import_get.default)(responseData, "_links[0].Next");
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData._links?.[0].Next);
  return returnData;
}
async function encryptPassphrase(certificateId, passphrase, storePassphrase) {
  let dekHash = "";
  const dekResponse = await venafiApiRequest.call(
    this,
    "GET",
    `/outagedetection/v1/certificates/${certificateId}`
  );
  if (dekResponse.dekHash) {
    dekHash = dekResponse.dekHash;
  }
  let pubKey = "";
  const pubKeyResponse = await venafiApiRequest.call(
    this,
    "GET",
    `/v1/edgeencryptionkeys/${dekHash}`
  );
  if (pubKeyResponse.key) {
    pubKey = pubKeyResponse.key;
  }
  let encryptedKeyPass = "";
  let encryptedKeyStorePass = "";
  const promise = async () => {
    return await new Promise((resolve, reject) => {
      nacl_factory.instantiate((nacl) => {
        try {
          const passphraseUTF8 = nacl.encode_utf8(passphrase);
          const keyPassBuffer = nacl.crypto_box_seal(passphraseUTF8, Buffer.from(pubKey, "base64"));
          encryptedKeyPass = Buffer.from(keyPassBuffer).toString("base64");
          const storePassphraseUTF8 = nacl.encode_utf8(storePassphrase);
          const keyStorePassBuffer = nacl.crypto_box_seal(
            storePassphraseUTF8,
            Buffer.from(pubKey, "base64")
          );
          encryptedKeyStorePass = Buffer.from(keyStorePassBuffer).toString("base64");
          return resolve([encryptedKeyPass, encryptedKeyStorePass]);
        } catch (error) {
          return reject(error);
        }
      });
    });
  };
  return await promise();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  encryptPassphrase,
  venafiApiRequest,
  venafiApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map