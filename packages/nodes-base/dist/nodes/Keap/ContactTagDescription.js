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
var ContactTagDescription_exports = {};
__export(ContactTagDescription_exports, {
  contactTagFields: () => contactTagFields,
  contactTagOperations: () => contactTagOperations
});
module.exports = __toCommonJS(ContactTagDescription_exports);
const contactTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactTag"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Add a list of tags to a contact",
        action: "Create a contact tag"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a contact's tag",
        action: "Delete a contact tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many contact's tags",
        action: "Get many contact tags"
      }
    ],
    default: "create"
  }
];
const contactTagFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 contactTag:create                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["contactTag"]
      }
    },
    default: ""
  },
  {
    displayName: "Tag Names or IDs",
    name: "tagIds",
    type: "multiOptions",
    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["contactTag"]
      }
    },
    default: []
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contactTag:delete                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["contactTag"]
      }
    },
    default: ""
  },
  {
    displayName: "Tag IDs",
    name: "tagIds",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["contactTag"]
      }
    },
    default: "Tag IDs, multiple ids can be set separated by comma."
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contactTag:getAll                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["contactTag"]
      }
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["contactTag"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["contactTag"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactTagFields,
  contactTagOperations
});
//# sourceMappingURL=ContactTagDescription.js.map