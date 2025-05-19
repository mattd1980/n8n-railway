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
var HubDescription_exports = {};
__export(HubDescription_exports, {
  hubFields: () => hubFields,
  hubOperations: () => hubOperations
});
module.exports = __toCommonJS(HubDescription_exports);
var import_DestinationDescription = require("./DestinationDescription");
const hubOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["hub"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new Onfleet hub",
        action: "Create a hub"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many Onfleet hubs",
        action: "Get many hubs"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an Onfleet hub",
        action: "Update a hub"
      }
    ],
    default: "getAll"
  }
];
const nameField = {
  displayName: "Name",
  name: "name",
  type: "string",
  default: "",
  description: "A name to identify the hub"
};
const teamsField = {
  displayName: "Team Names or IDs",
  name: "teams",
  type: "multiOptions",
  typeOptions: {
    loadOptionsMethod: "getTeams"
  },
  default: [],
  description: 'These are the teams that this Hub will be assigned to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
};
const hubFields = [
  {
    displayName: "Hub ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["hub"],
        operation: ["update"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the hub object for lookup"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["hub"],
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
        resource: ["hub"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 64
    },
    default: 64,
    description: "Max number of results to return"
  },
  {
    ...nameField,
    displayOptions: {
      show: {
        resource: ["hub"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...import_DestinationDescription.destinationExternalField,
    displayOptions: {
      show: {
        resource: ["hub"],
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
        resource: ["hub"],
        operation: ["create"]
      }
    },
    options: [
      {
        ...teamsField,
        required: false
      }
    ]
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["hub"],
        operation: ["update"]
      }
    },
    options: [
      {
        ...import_DestinationDescription.destinationExternalField,
        required: false
      },
      nameField,
      {
        ...teamsField,
        required: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hubFields,
  hubOperations
});
//# sourceMappingURL=HubDescription.js.map