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
var ConfigurationItemsDescription_exports = {};
__export(ConfigurationItemsDescription_exports, {
  configurationItemsFields: () => configurationItemsFields,
  configurationItemsOperations: () => configurationItemsOperations
});
module.exports = __toCommonJS(ConfigurationItemsDescription_exports);
const configurationItemsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["configurationItems"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many configuration items"
      }
    ],
    default: "getAll"
  }
];
const configurationItemsFields = [
  /* -------------------------------------------------------------------------- */
  /*                             configurationItems:getAll                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["configurationItems"]
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
        resource: ["configurationItems"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["configurationItems"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Exclude Reference Link",
        name: "sysparm_exclude_reference_link",
        type: "boolean",
        default: false,
        description: "Whether to exclude Table API links for reference fields"
      },
      {
        displayName: "Field Names or IDs",
        name: "sysparm_fields",
        type: "multiOptions",
        typeOptions: {
          // nodelinter-ignore-next-line
          loadOptionsMethod: "getColumns"
        },
        default: [],
        description: 'A list of fields to return. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        hint: "String of comma separated values or an array of strings can be set in an expression"
      },
      {
        displayName: "Filter",
        name: "sysparm_query",
        type: "string",
        default: "",
        description: 'An encoded query string used to filter the results. <a href="https://developer.servicenow.com/dev.do#!/learn/learning-plans/quebec/servicenow_application_developer/app_store_learnv2_rest_quebec_more_about_query_parameters">More info</a>.'
      },
      {
        displayName: "Return Values",
        name: "sysparm_display_value",
        type: "options",
        options: [
          {
            name: "Actual Values",
            value: "false"
          },
          {
            name: "Both",
            value: "all"
          },
          {
            name: "Display Values",
            value: "true"
          }
        ],
        default: "false",
        description: "Choose which values to return"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configurationItemsFields,
  configurationItemsOperations
});
//# sourceMappingURL=ConfigurationItemsDescription.js.map