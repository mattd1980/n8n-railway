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
var TrackDescription_exports = {};
__export(TrackDescription_exports, {
  trackFields: () => trackFields,
  trackOperations: () => trackOperations
});
module.exports = __toCommonJS(TrackDescription_exports);
const trackOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["track"]
      }
    },
    options: [
      {
        name: "Page",
        value: "page",
        description: "Track a page",
        action: "Track a page"
      },
      {
        name: "Screen",
        value: "screen",
        description: "Track a screen",
        action: "Track a screen"
      }
    ],
    default: "page"
  }
];
const trackFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 track:page                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["track"],
        operation: ["page", "screen"]
      }
    },
    default: ""
  },
  {
    displayName: "Distinct ID",
    name: "distinctId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["track"],
        operation: ["page", "screen"]
      }
    },
    default: "",
    description: "The user's distinct ID"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["track"],
        operation: ["page", "screen"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Category",
        name: "category",
        type: "string",
        default: ""
      },
      {
        displayName: "Context",
        name: "contextUi",
        type: "fixedCollection",
        placeholder: "Add Property",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Context",
            name: "contextValues",
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
        displayName: "Message ID",
        name: "messageId",
        type: "string",
        default: ""
      },
      {
        displayName: "Properties",
        name: "propertiesUi",
        type: "fixedCollection",
        placeholder: "Add Property",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Property",
            name: "propertyValues",
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
        displayName: "Timestamp",
        name: "timestamp",
        type: "dateTime",
        default: "",
        description: "If not set, it'll automatically be set to the current time"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  trackFields,
  trackOperations
});
//# sourceMappingURL=TrackDescription.js.map