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
var EventDescripion_exports = {};
__export(EventDescripion_exports, {
  eventFields: () => eventFields,
  eventOperations: () => eventOperations
});
module.exports = __toCommonJS(EventDescripion_exports);
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
        description: "Track an event for a specific customer",
        action: "Track an event"
      }
    ],
    default: "track"
  }
];
const eventFields = [
  /* -------------------------------------------------------------------------- */
  /*                                event:track                                     */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    },
    description: "The unique identifier of the customer"
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    }
  },
  {
    displayName: "Event Name",
    name: "eventName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"]
      }
    },
    description: "The name of the event tracked"
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
    displayName: "Data",
    name: "dataAttributesUi",
    placeholder: "Add Data",
    description: "Key value pairs that represent any properties you want to track with this event",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
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
        name: "dataAttributesValues",
        displayName: "Data",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: "",
            description: "Name of the property to set"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the property to set"
          }
        ]
      }
    ]
  },
  {
    displayName: "Extra",
    name: "extraAttributesUi",
    placeholder: "Add Extra",
    description: "Key value pairs that represent reserved, Vero-specific operators. Refer to the note on \u201Cdeduplication\u201D below.",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
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
        name: "extraAttributesValues",
        displayName: "Extra",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: "",
            description: "Name of the property to set"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the property to set"
          }
        ]
      }
    ]
  },
  {
    displayName: "Data",
    name: "dataAttributesJson",
    type: "json",
    default: "",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    description: "Key value pairs that represent the custom user properties you want to update",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"],
        jsonParameters: [true]
      }
    }
  },
  {
    displayName: "Extra",
    name: "extraAttributesJson",
    type: "json",
    default: "",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    description: "Key value pairs that represent reserved, Vero-specific operators. Refer to the note on \u201Cdeduplication\u201D below.",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["track"],
        jsonParameters: [true]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescripion.js.map