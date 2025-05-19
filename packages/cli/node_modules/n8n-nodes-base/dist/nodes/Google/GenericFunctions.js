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
  getGoogleAccessToken: () => getGoogleAccessToken,
  validateAndSetDate: () => validateAndSetDate
});
module.exports = __toCommonJS(GenericFunctions_exports);
var jwt = __toESM(require("jsonwebtoken"));
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const googleServiceAccountScopes = {
  bigquery: ["https://www.googleapis.com/auth/bigquery"],
  books: ["https://www.googleapis.com/auth/books"],
  chat: ["https://www.googleapis.com/auth/chat.bot"],
  docs: [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file"
  ],
  drive: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.photos.readonly"
  ],
  gmail: [
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
    "https://www.googleapis.com/auth/gmail.addons.current.message.action",
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose"
  ],
  sheetV1: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets"
  ],
  sheetV2: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.metadata"
  ],
  slides: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/presentations"
  ],
  translate: [
    "https://www.googleapis.com/auth/cloud-translation",
    "https://www.googleapis.com/auth/cloud-platform"
  ],
  firestore: [
    "https://www.googleapis.com/auth/datastore",
    "https://www.googleapis.com/auth/firebase"
  ],
  vertex: ["https://www.googleapis.com/auth/cloud-platform"]
};
async function getGoogleAccessToken(credentials, service) {
  const scopes = googleServiceAccountScopes[service];
  const privateKey = (0, import_utilities.formatPrivateKey)(credentials.privateKey);
  credentials.email = (credentials.email || "").trim();
  const now = (0, import_moment_timezone.default)().unix();
  const signature = jwt.sign(
    {
      iss: credentials.email,
      sub: credentials.delegatedEmail || credentials.email,
      scope: scopes.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600
    },
    privateKey,
    {
      algorithm: "RS256",
      header: {
        kid: privateKey,
        typ: "JWT",
        alg: "RS256"
      }
    }
  );
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signature
    },
    uri: "https://oauth2.googleapis.com/token",
    json: true
  };
  return await this.helpers.request(options);
}
function validateAndSetDate(filter, key, timezone, context) {
  const date = import_luxon.DateTime.fromISO(filter[key]);
  if (date.isValid) {
    filter[key] = date.setZone(timezone).toISO();
  } else {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      `The value "${filter[key]}" is not a valid DateTime.`
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGoogleAccessToken,
  validateAndSetDate
});
//# sourceMappingURL=GenericFunctions.js.map