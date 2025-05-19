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
  allProperties: () => allProperties
});
module.exports = __toCommonJS(descriptions_exports);
var import_activityFields = require("./activityFields");
var import_automationFields = require("./automationFields");
var import_memberFields = require("./memberFields");
var import_noteFields = require("./noteFields");
var import_organizationFields = require("./organizationFields");
var import_resources = require("./resources");
var import_taskFields = require("./taskFields");
const allProperties = [
  import_resources.resources,
  import_activityFields.activityOperations,
  import_memberFields.memberOperations,
  import_noteFields.noteOperations,
  import_organizationFields.organizationOperations,
  import_taskFields.taskOperations,
  import_automationFields.automationOperations,
  ...import_activityFields.activityFields,
  ...import_memberFields.memberFields,
  ...import_noteFields.noteFields,
  ...import_organizationFields.organizationFields,
  ...import_taskFields.taskFields,
  ...import_automationFields.automationFields
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  allProperties
});
//# sourceMappingURL=index.js.map