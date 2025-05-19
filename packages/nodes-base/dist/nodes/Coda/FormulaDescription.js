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
var FormulaDescription_exports = {};
__export(FormulaDescription_exports, {
  formulaFields: () => formulaFields,
  formulaOperations: () => formulaOperations
});
module.exports = __toCommonJS(FormulaDescription_exports);
const formulaOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["formula"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a formula",
        action: "Get a formula"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many formulas",
        action: "Get many formulas"
      }
    ],
    default: "get"
  }
];
const formulaFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   formula:get                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Doc Name or ID",
    name: "docId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getDocs"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["formula"],
        operation: ["get"]
      }
    },
    description: 'ID of the doc. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Formula ID",
    name: "formulaId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["formula"],
        operation: ["get"]
      }
    },
    description: "The formula to get the row from"
  },
  /* -------------------------------------------------------------------------- */
  /*                                   formula:getAll                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Doc Name or ID",
    name: "docId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getDocs"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["formula"],
        operation: ["getAll"]
      }
    },
    description: 'ID of the doc. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["formula"],
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
        resource: ["formula"],
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
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formulaFields,
  formulaOperations
});
//# sourceMappingURL=FormulaDescription.js.map