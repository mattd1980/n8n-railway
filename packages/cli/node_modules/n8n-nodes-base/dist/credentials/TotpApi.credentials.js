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
var TotpApi_credentials_exports = {};
__export(TotpApi_credentials_exports, {
  TotpApi: () => TotpApi
});
module.exports = __toCommonJS(TotpApi_credentials_exports);
class TotpApi {
  constructor() {
    this.name = "totpApi";
    this.displayName = "TOTP API";
    this.documentationUrl = "totp";
    this.properties = [
      {
        displayName: "Secret",
        name: "secret",
        type: "string",
        typeOptions: { password: true },
        default: "",
        placeholder: "e.g. BVDRSBXQB2ZEL5HE",
        required: true,
        description: 'Secret key encoded in the QR code during setup. <a href="https://github.com/google/google-authenticator/wiki/Key-Uri-Format#secret">Learn more</a>.'
      },
      {
        displayName: "Label",
        name: "label",
        type: "string",
        default: "",
        required: true,
        placeholder: "e.g. GitHub:john-doe",
        description: 'Identifier for the TOTP account, in the <code>issuer:username</code> format. <a href="https://github.com/google/google-authenticator/wiki/Key-Uri-Format#label">Learn more</a>.'
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TotpApi
});
//# sourceMappingURL=TotpApi.credentials.js.map