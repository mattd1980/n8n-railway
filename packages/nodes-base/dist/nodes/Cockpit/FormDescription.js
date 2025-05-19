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
var FormDescription_exports = {};
__export(FormDescription_exports, {
  formFields: () => formFields,
  formOperations: () => formOperations
});
module.exports = __toCommonJS(FormDescription_exports);
const formOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["form"]
      }
    },
    options: [
      {
        name: "Submit a Form",
        value: "submit",
        description: "Store data from a form submission",
        action: "Submit a form"
      }
    ],
    default: "submit"
  }
];
const formFields = [
  {
    displayName: "Form",
    name: "form",
    type: "string",
    displayOptions: {
      show: {
        resource: ["form"]
      }
    },
    default: "",
    required: true,
    description: "Name of the form to operate on"
  },
  // Form:submit
  {
    displayName: "JSON Data Fields",
    name: "jsonDataFields",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["form"],
        operation: ["submit"]
      }
    },
    description: "Whether form fields should be set via the value-key pair UI or JSON"
  },
  {
    displayName: "Form Data",
    name: "dataFieldsJson",
    type: "json",
    default: "",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    displayOptions: {
      show: {
        jsonDataFields: [true],
        resource: ["form"],
        operation: ["submit"]
      }
    },
    description: "Form data to send as JSON"
  },
  {
    displayName: "Form Data",
    name: "dataFieldsUi",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        jsonDataFields: [false],
        resource: ["form"],
        operation: ["submit"]
      }
    },
    options: [
      {
        displayName: "Field",
        name: "field",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the field"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the field"
          }
        ]
      }
    ],
    description: "Form data to send"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formFields,
  formOperations
});
//# sourceMappingURL=FormDescription.js.map