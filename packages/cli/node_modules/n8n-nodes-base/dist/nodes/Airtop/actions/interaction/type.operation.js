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
var type_operation_exports = {};
__export(type_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(type_operation_exports);
var import_helpers = require("./helpers");
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
var import_fields = require("../common/fields");
const description = [
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["interaction"],
        operation: ["type"]
      }
    },
    description: "The text to type into the browser window",
    placeholder: "e.g. email@example.com"
  },
  {
    displayName: "Press Enter Key",
    name: "pressEnterKey",
    type: "boolean",
    default: false,
    description: "Whether to press the Enter key after typing the text",
    displayOptions: {
      show: {
        resource: ["interaction"],
        operation: ["type"]
      }
    }
  },
  {
    ...import_fields.elementDescriptionField,
    displayOptions: {
      show: {
        resource: ["interaction"],
        operation: ["type"]
      }
    }
  }
];
async function execute(index) {
  const { sessionId, windowId } = import_GenericFunctions.validateSessionAndWindowId.call(this, index);
  const text = import_GenericFunctions.validateRequiredStringField.call(this, index, "text", "Text");
  const pressEnterKey = this.getNodeParameter("pressEnterKey", index);
  const elementDescription = this.getNodeParameter("elementDescription", index);
  const request = import_helpers.constructInteractionRequest.call(this, index, {
    text,
    pressEnterKey,
    elementDescription
  });
  const response = await import_transport.apiRequest.call(
    this,
    "POST",
    `/sessions/${sessionId}/windows/${windowId}/type`,
    request
  );
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  return this.helpers.returnJsonArray({ sessionId, windowId, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=type.operation.js.map