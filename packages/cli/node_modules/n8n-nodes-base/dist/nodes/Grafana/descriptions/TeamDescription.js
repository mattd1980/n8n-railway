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
var TeamDescription_exports = {};
__export(TeamDescription_exports, {
  teamFields: () => teamFields,
  teamOperations: () => teamOperations
});
module.exports = __toCommonJS(TeamDescription_exports);
const teamOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["team"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a team",
        action: "Create a team"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a team",
        action: "Delete a team"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a team",
        action: "Get a team"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many teams",
        action: "Get many teams"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a team",
        action: "Update a team"
      }
    ],
    default: "create"
  }
];
const teamFields = [
  // ----------------------------------------
  //               team: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Name of the team to create",
    placeholder: "Engineering",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "engineering@n8n.io",
        default: "",
        description: "Email of the team to create"
      }
    ]
  },
  // ----------------------------------------
  //               team: delete
  // ----------------------------------------
  {
    displayName: "Team ID",
    name: "teamId",
    description: "ID of the team to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                team: get
  // ----------------------------------------
  {
    displayName: "Team ID",
    name: "teamId",
    description: "ID of the team to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               team: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["team"],
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
        resource: ["team"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name of the team to filter by"
      }
    ]
  },
  // ----------------------------------------
  //               team: update
  // ----------------------------------------
  {
    displayName: "Team ID",
    name: "teamId",
    description: "ID of the team to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "engineering@n8n.io",
        default: "",
        description: "Email of the team to update"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        placeholder: "Engineering Team",
        default: "",
        description: "Name of the team to update"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  teamFields,
  teamOperations
});
//# sourceMappingURL=TeamDescription.js.map