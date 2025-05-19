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
var Helpers_exports = {};
__export(Helpers_exports, {
  BINARY_AD_ATTRIBUTES: () => BINARY_AD_ATTRIBUTES,
  createLdapClient: () => createLdapClient,
  resolveBinaryAttributes: () => resolveBinaryAttributes
});
module.exports = __toCommonJS(Helpers_exports);
var import_ldapts = require("ldapts");
const BINARY_AD_ATTRIBUTES = ["objectGUID", "objectSid"];
const resolveEntryBinaryAttributes = (entry) => {
  Object.entries(entry).filter(([k]) => BINARY_AD_ATTRIBUTES.includes(k)).forEach(([k]) => {
    entry[k] = entry[k].toString("hex");
  });
  return entry;
};
const resolveBinaryAttributes = (entries) => {
  entries.forEach((entry) => resolveEntryBinaryAttributes(entry));
};
async function createLdapClient(context, credentials, nodeDebug, nodeType, nodeName) {
  const protocol = credentials.connectionSecurity === "tls" ? "ldaps" : "ldap";
  const url = `${protocol}://${credentials.hostname}:${credentials.port}`;
  const ldapOptions = { url };
  const tlsOptions = {};
  if (credentials.connectionSecurity !== "none") {
    tlsOptions.rejectUnauthorized = credentials.allowUnauthorizedCerts === false;
    if (credentials.caCertificate) {
      tlsOptions.ca = [credentials.caCertificate];
    }
    if (credentials.connectionSecurity !== "startTls") {
      ldapOptions.tlsOptions = tlsOptions;
    }
  }
  if (credentials.timeout) {
    ldapOptions.timeout = credentials.timeout * 1e3;
  }
  if (nodeDebug) {
    context.logger.info(
      `[${nodeType} | ${nodeName}] - LDAP Options: ${JSON.stringify(ldapOptions, null, 2)}`
    );
  }
  const client = new import_ldapts.Client(ldapOptions);
  if (credentials.connectionSecurity === "startTls") {
    await client.startTLS(tlsOptions);
  }
  return client;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BINARY_AD_ATTRIBUTES,
  createLdapClient,
  resolveBinaryAttributes
});
//# sourceMappingURL=Helpers.js.map