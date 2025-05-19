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
var common_description_exports = {};
__export(common_description_exports, {
  groupSourceOptions: () => groupSourceOptions
});
module.exports = __toCommonJS(common_description_exports);
const groupSourceOptions = {
  displayName: "Group Source",
  name: "groupSource",
  required: true,
  type: "options",
  default: "all",
  description: "From where to select groups and teams",
  options: [
    {
      name: "All Groups",
      value: "all",
      description: "From all groups"
    },
    {
      name: "My Groups",
      value: "mine",
      description: "Only load groups that account is member of"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupSourceOptions
});
//# sourceMappingURL=common.description.js.map