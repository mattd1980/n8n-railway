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
var descriptions_exports = {};
__export(descriptions_exports, {
  clientFields: () => import_ClientDescription.clientFields,
  clientOperations: () => import_ClientDescription.clientOperations,
  siteFields: () => import_SiteDescription.siteFields,
  siteOperations: () => import_SiteDescription.siteOperations,
  ticketFields: () => import_TicketDescription.ticketFields,
  ticketOperations: () => import_TicketDescription.ticketOperations,
  userFields: () => import_UserDescription.userFields,
  userOperations: () => import_UserDescription.userOperations
});
module.exports = __toCommonJS(descriptions_exports);
var import_ClientDescription = require("./ClientDescription");
var import_SiteDescription = require("./SiteDescription");
var import_TicketDescription = require("./TicketDescription");
var import_UserDescription = require("./UserDescription");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientFields,
  clientOperations,
  siteFields,
  siteOperations,
  ticketFields,
  ticketOperations,
  userFields,
  userOperations
});
//# sourceMappingURL=index.js.map