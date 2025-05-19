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
var constants_exports = {};
__export(constants_exports, {
  FALLBACK_DEFAULT_VALUE: () => FALLBACK_DEFAULT_VALUE,
  INPUT_SOURCE: () => INPUT_SOURCE,
  JSON_EXAMPLE: () => JSON_EXAMPLE,
  PASSTHROUGH: () => PASSTHROUGH,
  TYPE_OPTIONS: () => TYPE_OPTIONS,
  VALUES: () => VALUES,
  WORKFLOW_INPUTS: () => WORKFLOW_INPUTS
});
module.exports = __toCommonJS(constants_exports);
const INPUT_SOURCE = "inputSource";
const WORKFLOW_INPUTS = "workflowInputs";
const VALUES = "values";
const JSON_EXAMPLE = "jsonExample";
const PASSTHROUGH = "passthrough";
const TYPE_OPTIONS = [
  {
    name: "Allow Any Type",
    value: "any"
  },
  {
    name: "String",
    value: "string"
  },
  {
    name: "Number",
    value: "number"
  },
  {
    name: "Boolean",
    value: "boolean"
  },
  {
    name: "Array",
    value: "array"
  },
  {
    name: "Object",
    value: "object"
  }
  // Intentional omission of `dateTime`, `time`, `string-alphanumeric`, `form-fields`, `jwt` and `url`
];
const FALLBACK_DEFAULT_VALUE = null;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FALLBACK_DEFAULT_VALUE,
  INPUT_SOURCE,
  JSON_EXAMPLE,
  PASSTHROUGH,
  TYPE_OPTIONS,
  VALUES,
  WORKFLOW_INPUTS
});
//# sourceMappingURL=constants.js.map