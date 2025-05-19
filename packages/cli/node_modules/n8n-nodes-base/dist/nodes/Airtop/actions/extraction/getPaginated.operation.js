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
var getPaginated_operation_exports = {};
__export(getPaginated_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getPaginated_operation_exports);
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
    displayOptions: {
      show: {
        resource: ["extraction"],
        operation: ["getPaginated"]
      }
    },
    description: "The prompt to extract data from the pages",
    placeholder: "e.g. Extract all the product names and prices"
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
        operation: ["getPaginated"]
      }
    },
    options: [
      {
        ...import_fields.outputSchemaField
      },
      {
        displayName: "Interaction Mode",
        name: "interactionMode",
        type: "options",
        default: "auto",
        description: "The strategy for interacting with the page",
        options: [
          {
            name: "Auto",
            description: "Automatically choose the most cost-effective mode",
            value: "auto"
          },
          {
            name: "Accurate",
            description: "Prioritize accuracy over cost",
            value: "accurate"
          },
          {
            name: "Cost Efficient",
            description: "Minimize costs while ensuring effectiveness",
            value: "cost-efficient"
          }
        ]
      },
      {
        displayName: "Pagination Mode",
        name: "paginationMode",
        type: "options",
        default: "auto",
        description: "The pagination approach to use",
        options: [
          {
            name: "Auto",
            description: "Look for pagination links first, then try infinite scrolling",
            value: "auto"
          },
          {
            name: "Paginated",
            description: "Only use pagination links",
            value: "paginated"
          },
          {
            name: "Infinite Scroll",
            description: "Scroll the page to load more content",
            value: "infinite-scroll"
          }
        ]
      }
    ]
  }
];
async function execute(index) {
  const prompt = this.getNodeParameter("prompt", index, "");
  const additionalFields = this.getNodeParameter("additionalFields", index);
  return await import_session.executeRequestWithSessionManagement.call(this, index, {
    method: "POST",
    path: "/sessions/{sessionId}/windows/{windowId}/paginated-extraction",
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
//# sourceMappingURL=getPaginated.operation.js.map