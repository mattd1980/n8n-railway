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
var GalaxyDescription_exports = {};
__export(GalaxyDescription_exports, {
  galaxyFields: () => galaxyFields,
  galaxyOperations: () => galaxyOperations
});
module.exports = __toCommonJS(GalaxyDescription_exports);
const galaxyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["galaxy"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a galaxy"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a galaxy"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many galaxies"
      }
    ],
    default: "get"
  }
];
const galaxyFields = [
  // ----------------------------------------
  //              galaxy: delete
  // ----------------------------------------
  {
    displayName: "Galaxy ID",
    name: "galaxyId",
    description: "UUID or numeric ID of the galaxy",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["galaxy"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //               galaxy: get
  // ----------------------------------------
  {
    displayName: "Galaxy ID",
    name: "galaxyId",
    description: "UUID or numeric ID of the galaxy",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["galaxy"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //              galaxy: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["galaxy"],
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
        resource: ["galaxy"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  galaxyFields,
  galaxyOperations
});
//# sourceMappingURL=GalaxyDescription.js.map