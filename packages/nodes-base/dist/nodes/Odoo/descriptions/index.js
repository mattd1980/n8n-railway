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
  contactDescription: () => import_ContactDescription.contactDescription,
  contactOperations: () => import_ContactDescription.contactOperations,
  customResourceDescription: () => import_CustomResourceDescription.customResourceDescription,
  customResourceOperations: () => import_CustomResourceDescription.customResourceOperations,
  noteDescription: () => import_NoteDescription.noteDescription,
  noteOperations: () => import_NoteDescription.noteOperations,
  opportunityDescription: () => import_OpportunityDescription.opportunityDescription,
  opportunityOperations: () => import_OpportunityDescription.opportunityOperations
});
module.exports = __toCommonJS(descriptions_exports);
var import_ContactDescription = require("./ContactDescription");
var import_CustomResourceDescription = require("./CustomResourceDescription");
var import_NoteDescription = require("./NoteDescription");
var import_OpportunityDescription = require("./OpportunityDescription");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactDescription,
  contactOperations,
  customResourceDescription,
  customResourceOperations,
  noteDescription,
  noteOperations,
  opportunityDescription,
  opportunityOperations
});
//# sourceMappingURL=index.js.map