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
var PushDescription_exports = {};
__export(PushDescription_exports, {
  pushFields: () => pushFields
});
module.exports = __toCommonJS(PushDescription_exports);
const pushFields = [
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["push"]
      }
    },
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Target Repository",
        name: "targetRepository",
        type: "string",
        default: "",
        placeholder: "https://github.com/n8n-io/n8n",
        description: "The URL or path of the repository to push to"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pushFields
});
//# sourceMappingURL=PushDescription.js.map