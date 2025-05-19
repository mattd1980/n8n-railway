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
var WarninglistDescription_exports = {};
__export(WarninglistDescription_exports, {
  warninglistFields: () => warninglistFields,
  warninglistOperations: () => warninglistOperations
});
module.exports = __toCommonJS(WarninglistDescription_exports);
const warninglistOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["warninglist"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a warninglist"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many warninglists"
      }
    ],
    default: "get"
  }
];
const warninglistFields = [
  // ----------------------------------------
  //             warninglist: get
  // ----------------------------------------
  {
    displayName: "Warninglist ID",
    name: "warninglistId",
    description: "Numeric ID of the warninglist",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["warninglist"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //           warninglist: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["warninglist"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["warninglist"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  warninglistFields,
  warninglistOperations
});
//# sourceMappingURL=WarninglistDescription.js.map