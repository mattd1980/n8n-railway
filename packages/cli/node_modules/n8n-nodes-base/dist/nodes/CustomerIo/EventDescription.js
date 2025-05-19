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
var EventDescription_exports = {};
__export(EventDescription_exports, {
  eventFields: () => eventFields,
  eventOperations: () => eventOperations
});
module.exports = __toCommonJS(EventDescription_exports);
const eventOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["event"]
      }
    },
    options: [
      {
        name: "Track",
        value: "track",
        description: "Track a customer event",
        action: "Track a customer event"
      },
      {
        name: "Track Anonymous",
        value: "trackAnonymous",
        description: "Track an anonymous event",
        action: "Track an anonymous event"
      }
    ],
    default: "track"
  }
];
const eventFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   event:track                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    },
    description: "The unique identifier for the customer"
  },
  {
    displayName: "Event Name",
    name: "eventName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    },
    description: "Name of the event to track"
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFieldsJson",
    type: "json",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"],
        jsonParameters: [true]
      }
    },
    description: 'Object of values to set as described <a href="https://customer.io/docs/api-triggered-data-format#basic-data-formatting">here</a>'
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"],
        jsonParameters: [false]
      }
    },
    options: [
      {
        displayName: "Custom Attributes",
        name: "customAttributes",
        type: "fixedCollection",
        default: {},
        description: "Custom Properties",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Attribute",
            name: "customAttribute",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                required: true,
                default: "",
                description: "Attribute name",
                placeholder: "Price"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                required: true,
                default: "",
                description: "Attribute value",
                placeholder: "25.50"
              }
            ]
          }
        ]
      },
      {
        displayName: "Type",
        name: "type",
        type: "string",
        default: "",
        description: 'Used to change event type. For Page View events set to "page".'
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                   event:track anonymous                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Event Name",
    name: "eventName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["trackAnonymous"]
      }
    },
    description: "The unique identifier for the customer"
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["trackAnonymous"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFieldsJson",
    type: "json",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["trackAnonymous"],
        jsonParameters: [true]
      }
    },
    description: 'Object of values to set as described <a href="https://customer.io/docs/api-triggered-data-format#basic-data-formatting">here</a>'
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["trackAnonymous"],
        jsonParameters: [false]
      }
    },
    options: [
      {
        displayName: "Custom Attributes",
        name: "customAttributes",
        type: "fixedCollection",
        default: {},
        description: "Custom Properties",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Attribute",
            name: "customAttribute",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                required: true,
                default: "",
                description: "Attribute name",
                placeholder: "Price"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                required: true,
                default: "",
                description: "Attribute value",
                placeholder: "25.50"
              }
            ]
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map