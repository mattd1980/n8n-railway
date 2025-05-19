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
var ServiceDescription_exports = {};
__export(ServiceDescription_exports, {
  serviceFields: () => serviceFields,
  serviceOperations: () => serviceOperations
});
module.exports = __toCommonJS(ServiceDescription_exports);
const serviceOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["service"]
      }
    },
    options: [
      {
        name: "Call",
        value: "call",
        description: "Call a service within a specific domain",
        action: "Call a service"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many services",
        action: "Get many services"
      }
    ],
    default: "getAll"
  }
];
const serviceFields = [
  /* -------------------------------------------------------------------------- */
  /*                                service:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["service"]
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
        resource: ["service"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                service:Call                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Domain Name or ID",
    name: "domain",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getDomains"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["service"],
        operation: ["call"]
      }
    }
  },
  {
    displayName: "Service Name or ID",
    name: "service",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["domain"],
      loadOptionsMethod: "getDomainServices"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["service"],
        operation: ["call"]
      }
    }
  },
  {
    displayName: "Service Attributes",
    name: "serviceAttributes",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    placeholder: "Add Attribute",
    default: {},
    displayOptions: {
      show: {
        resource: ["service"],
        operation: ["call"]
      }
    },
    options: [
      {
        name: "attributes",
        displayName: "Attributes",
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
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serviceFields,
  serviceOperations
});
//# sourceMappingURL=ServiceDescription.js.map