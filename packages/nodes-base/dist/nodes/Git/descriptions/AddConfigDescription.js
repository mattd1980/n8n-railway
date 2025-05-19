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
var AddConfigDescription_exports = {};
__export(AddConfigDescription_exports, {
  addConfigFields: () => addConfigFields
});
module.exports = __toCommonJS(AddConfigDescription_exports);
const addConfigFields = [
  {
    displayName: "Key",
    name: "key",
    type: "string",
    displayOptions: {
      show: {
        operation: ["addConfig"]
      }
    },
    default: "",
    placeholder: "user.email",
    description: "Name of the key to set",
    required: true
  },
  {
    displayName: "Value",
    name: "value",
    type: "string",
    displayOptions: {
      show: {
        operation: ["addConfig"]
      }
    },
    default: "",
    placeholder: "name@example.com",
    description: "Value of the key to set",
    required: true
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["addConfig"]
      }
    },
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Mode",
        name: "mode",
        type: "options",
        options: [
          {
            name: "Append",
            value: "append"
          },
          {
            name: "Set",
            value: "set"
          }
        ],
        default: "set",
        description: "Append setting rather than set it in the local config"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addConfigFields
});
//# sourceMappingURL=AddConfigDescription.js.map