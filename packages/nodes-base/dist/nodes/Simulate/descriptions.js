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
  executionDurationProperty: () => executionDurationProperty,
  iconSelector: () => iconSelector,
  jsonOutputProperty: () => jsonOutputProperty,
  subtitleProperty: () => subtitleProperty
});
module.exports = __toCommonJS(descriptions_exports);
const iconSelector = {
  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
  displayName: "Icon to Display on Canvas",
  name: "icon",
  type: "options",
  // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
  description: "Select a type of node to show corresponding icon",
  default: "n8n-nodes-base.noOp",
  typeOptions: {
    loadOptionsMethod: "getNodeTypes"
  }
};
const subtitleProperty = {
  displayName: "Subtitle",
  name: "subtitle",
  type: "string",
  default: "",
  placeholder: "e.g. 'record: read'"
};
const jsonOutputProperty = {
  displayName: "JSON",
  name: "jsonOutput",
  type: "json",
  typeOptions: {
    rows: 5
  },
  default: '[\n  {\n  "my_field_1": "value",\n  "my_field_2": 1\n  }\n]',
  validateType: "array"
};
const executionDurationProperty = {
  displayName: "Execution Duration (MS)",
  name: "executionDuration",
  type: "number",
  default: 150,
  description: "Execution duration in milliseconds",
  typeOptions: {
    minValue: 0
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executionDurationProperty,
  iconSelector,
  jsonOutputProperty,
  subtitleProperty
});
//# sourceMappingURL=descriptions.js.map