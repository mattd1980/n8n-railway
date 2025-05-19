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
var rlc_description_exports = {};
__export(rlc_description_exports, {
  reportRLC: () => reportRLC,
  searchJobRLC: () => searchJobRLC,
  userRLC: () => userRLC
});
module.exports = __toCommonJS(rlc_description_exports);
const reportRLC = {
  displayName: "Report",
  name: "reportId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a report...",
      typeOptions: {
        searchListMethod: "searchReports",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. Errors%20in%20the%20last%20hour"
    }
  ]
};
const searchJobRLC = {
  displayName: "Search Job",
  name: "searchJobId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a search job...",
      typeOptions: {
        searchListMethod: "searchJobs",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. 1718944376.178"
    }
  ]
};
const userRLC = {
  displayName: "User",
  name: "userId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a user...",
      typeOptions: {
        searchListMethod: "searchUsers",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. admin"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reportRLC,
  searchJobRLC,
  userRLC
});
//# sourceMappingURL=rlc.description.js.map