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
var DefaultOptions_exports = {};
__export(DefaultOptions_exports, {
  rabbitDefaultOptions: () => rabbitDefaultOptions
});
module.exports = __toCommonJS(DefaultOptions_exports);
const rabbitDefaultOptions = [
  {
    displayName: "Arguments",
    name: "arguments",
    placeholder: "Add Argument",
    description: "Arguments to add",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        name: "argument",
        displayName: "Argument",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: ""
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Headers",
    name: "headers",
    placeholder: "Add Header",
    description: "Headers to add",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        name: "header",
        displayName: "Header",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: ""
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Auto Delete Queue",
    name: "autoDelete",
    type: "boolean",
    default: false,
    description: "Whether the queue will be deleted when the number of consumers drops to zero"
  },
  {
    displayName: "Assert Exchange",
    name: "assertExchange",
    type: "boolean",
    default: true,
    description: "Whether to assert the exchange exists before sending"
  },
  {
    displayName: "Assert Queue",
    name: "assertQueue",
    type: "boolean",
    default: true,
    description: "Whether to assert the queue exists before sending"
  },
  {
    displayName: "Durable",
    name: "durable",
    type: "boolean",
    default: true,
    description: "Whether the queue will survive broker restarts"
  },
  {
    displayName: "Exclusive",
    name: "exclusive",
    type: "boolean",
    default: false,
    description: "Whether to scope the queue to the connection"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rabbitDefaultOptions
});
//# sourceMappingURL=DefaultOptions.js.map