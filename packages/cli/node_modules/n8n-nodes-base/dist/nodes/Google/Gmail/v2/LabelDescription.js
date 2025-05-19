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
var LabelDescription_exports = {};
__export(LabelDescription_exports, {
  labelFields: () => labelFields,
  labelOperations: () => labelOperations
});
module.exports = __toCommonJS(LabelDescription_exports);
const labelOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["label"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a label"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a label"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a label info"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many labels"
      }
    ],
    default: "getAll"
  }
];
const labelFields = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["label"],
        operation: ["create"]
      }
    },
    placeholder: "invoices",
    description: "Label Name"
  },
  {
    displayName: "Label ID",
    name: "labelId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["label"],
        operation: ["get", "delete"]
      }
    },
    description: "The ID of the label"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    displayOptions: {
      show: {
        resource: ["label"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Label List Visibility",
        name: "labelListVisibility",
        type: "options",
        options: [
          {
            name: "Hide",
            value: "labelHide"
          },
          {
            name: "Show",
            value: "labelShow"
          },
          {
            name: "Show If Unread",
            value: "labelShowIfUnread"
          }
        ],
        default: "labelShow",
        description: "The visibility of the label in the label list in the Gmail web interface"
      },
      {
        displayName: "Message List Visibility",
        name: "messageListVisibility",
        type: "options",
        options: [
          {
            name: "Hide",
            value: "hide"
          },
          {
            name: "Show",
            value: "show"
          }
        ],
        default: "show",
        description: "The visibility of messages with this label in the message list in the Gmail web interface"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 label:getAll                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["label"]
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
        resource: ["label"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  labelFields,
  labelOperations
});
//# sourceMappingURL=LabelDescription.js.map