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
var MessageLabelDescription_exports = {};
__export(MessageLabelDescription_exports, {
  messageLabelFields: () => messageLabelFields,
  messageLabelOperations: () => messageLabelOperations
});
module.exports = __toCommonJS(MessageLabelDescription_exports);
const messageLabelOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["messageLabel"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        action: "Add a label to a message"
      },
      {
        name: "Remove",
        value: "remove",
        action: "Remove a label from a message"
      }
    ],
    default: "add"
  }
];
const messageLabelFields = [
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["messageLabel"],
        operation: ["add", "remove"]
      }
    },
    placeholder: "172ce2c4a72cc243"
  },
  {
    displayName: "Label Names or IDs",
    name: "labelIds",
    type: "multiOptions",
    typeOptions: {
      loadOptionsMethod: "getLabels"
    },
    default: [],
    required: true,
    displayOptions: {
      show: {
        resource: ["messageLabel"],
        operation: ["add", "remove"]
      }
    },
    description: 'The ID of the label. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  messageLabelFields,
  messageLabelOperations
});
//# sourceMappingURL=MessageLabelDescription.js.map