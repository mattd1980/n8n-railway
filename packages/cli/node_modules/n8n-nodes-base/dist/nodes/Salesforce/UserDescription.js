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
var UserDescription_exports = {};
__export(UserDescription_exports, {
  userFields: () => userFields,
  userOperations: () => userOperations
});
module.exports = __toCommonJS(UserDescription_exports);
const userOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["user"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a user",
        action: "Get a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many users",
        action: "Get many users"
      }
    ],
    default: "get"
  }
];
const userFields = [
  /* -------------------------------------------------------------------------- */
  /*                                  user:get                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"]
      }
    },
    description: "ID of user that needs to be fetched"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 user:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"]
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
        resource: ["user"],
        operation: ["getAll"],
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
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Conditions",
        name: "conditionsUi",
        placeholder: "Add Condition",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        description: "The condition to set",
        default: {},
        options: [
          {
            name: "conditionValues",
            displayName: "Condition",
            values: [
              {
                displayName: "Field Name or ID",
                name: "field",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "getUserFields"
                },
                default: "",
                description: 'For date, number, or boolean, please use expressions. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              // eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
              {
                displayName: "Operation",
                name: "operation",
                type: "options",
                options: [
                  {
                    name: "<",
                    value: "<"
                  },
                  {
                    name: "<=",
                    value: "<="
                  },
                  {
                    name: "=",
                    value: "equal"
                  },
                  {
                    name: ">",
                    value: ">"
                  },
                  {
                    name: ">=",
                    value: ">="
                  }
                ],
                default: "equal"
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
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields to include separated by ,"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map