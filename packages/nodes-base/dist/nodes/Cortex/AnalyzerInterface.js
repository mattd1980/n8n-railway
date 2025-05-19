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
var AnalyzerInterface_exports = {};
__export(AnalyzerInterface_exports, {
  JobStatuses: () => JobStatuses,
  ObservableDataTypes: () => ObservableDataTypes,
  TLPs: () => TLPs
});
module.exports = __toCommonJS(AnalyzerInterface_exports);
const JobStatuses = {
  WAITING: "Waiting",
  INPROGRESS: "InProgress",
  SUCCESS: "Success",
  FAILURE: "Failure",
  DELETED: "Deleted"
};
const TLPs = {
  white: 0,
  green: 1,
  amber: 2,
  red: 3
};
const ObservableDataTypes = {
  domain: "domain",
  file: "file",
  filename: "filename",
  fqdn: "fqdn",
  hash: "hash",
  ip: "ip",
  mail: "mail",
  mail_subject: "mail_subject",
  other: "other",
  regexp: "regexp",
  registry: "registry",
  uri_path: "uri_path",
  url: "url",
  "user-agent": "user-agent"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobStatuses,
  ObservableDataTypes,
  TLPs
});
//# sourceMappingURL=AnalyzerInterface.js.map