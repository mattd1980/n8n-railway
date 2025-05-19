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
var AgentRoleDescription_exports = {};
__export(AgentRoleDescription_exports, {
  agentRoleFields: () => agentRoleFields,
  agentRoleOperations: () => agentRoleOperations
});
module.exports = __toCommonJS(AgentRoleDescription_exports);
const agentRoleOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["agentRole"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Retrieve an agent role",
        action: "Get an agent role"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many agent roles",
        action: "Get many agent roles"
      }
    ],
    default: "get"
  }
];
const agentRoleFields = [
  // ----------------------------------------
  //              agentRole: get
  // ----------------------------------------
  {
    displayName: "Agent Role ID",
    name: "agentRoleId",
    description: "ID of the agent role to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["agentRole"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //            agentRole: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["agentRole"],
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
        resource: ["agentRole"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agentRoleFields,
  agentRoleOperations
});
//# sourceMappingURL=AgentRoleDescription.js.map