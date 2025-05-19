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
var load_operation_exports = {};
__export(load_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(load_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
var import_fields = require("../common/fields");
const description = [
  {
    ...import_fields.urlField,
    required: true,
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["load"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["load"]
      }
    },
    options: [
      {
        displayName: "Wait Until",
        name: "waitUntil",
        type: "options",
        default: "load",
        description: "Wait until the specified loading event occurs. Defaults to 'Fully Loaded'.",
        options: [
          {
            name: "Complete",
            value: "complete",
            description: "Wait until the page and all it's iframes have loaded it's dom and assets"
          },
          {
            name: "DOM Only Loaded",
            value: "domContentLoaded",
            description: "Wait until the dom has loaded"
          },
          {
            name: "Fully Loaded",
            value: "load",
            description: "Wait until the page dom and it's assets have loaded"
          },
          {
            name: "No Wait",
            value: "noWait",
            description: "Do not wait for any loading event and will return immediately"
          }
        ]
      }
    ]
  }
];
async function execute(index) {
  const { sessionId, windowId } = import_GenericFunctions.validateSessionAndWindowId.call(this, index);
  let url = import_GenericFunctions.validateRequiredStringField.call(this, index, "url", "URL");
  url = import_GenericFunctions.validateUrl.call(this, index);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const response = await import_transport.apiRequest.call(
    this,
    "POST",
    `/sessions/${sessionId}/windows/${windowId}`,
    {
      url,
      waitUntil: additionalFields.waitUntil
    }
  );
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  return this.helpers.returnJsonArray({ sessionId, windowId, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=load.operation.js.map