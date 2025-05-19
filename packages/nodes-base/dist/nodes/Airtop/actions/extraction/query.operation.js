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
var query_operation_exports = {};
__export(query_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(query_operation_exports);
var import_fields = require("../common/fields");
var import_session = require("../common/session.utils");
const description = [
  {
    displayName: "Prompt",
    name: "prompt",
    type: "string",
    typeOptions: {
      rows: 4
    },
    required: true,
    default: "",
    placeholder: "e.g. Is there a login form in this page?",
    displayOptions: {
      show: {
        resource: ["extraction"],
        operation: ["query"]
      }
    },
    description: "The prompt to query the page content"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["extraction"],
        operation: ["query"]
      }
    },
    options: [
      {
        ...import_fields.outputSchemaField
      }
    ]
  }
];
async function execute(index) {
  const prompt = this.getNodeParameter("prompt", index, "");
  const additionalFields = this.getNodeParameter("additionalFields", index);
  return await import_session.executeRequestWithSessionManagement.call(this, index, {
    method: "POST",
    path: "/sessions/{sessionId}/windows/{windowId}/page-query",
    body: {
      prompt,
      configuration: {
        ...additionalFields
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=query.operation.js.map