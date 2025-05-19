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
var TemplateDescription_exports = {};
__export(TemplateDescription_exports, {
  templateFields: () => templateFields,
  templateOperations: () => templateOperations
});
module.exports = __toCommonJS(TemplateDescription_exports);
const templateOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["template"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a template",
        action: "Get a template"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many templates",
        action: "Get many templates"
      }
    ],
    default: "get"
  }
];
const templateFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 template:get                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["template"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for the template"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  templateFields,
  templateOperations
});
//# sourceMappingURL=TemplateDescription.js.map