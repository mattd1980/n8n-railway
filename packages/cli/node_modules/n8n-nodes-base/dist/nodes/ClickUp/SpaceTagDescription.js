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
var SpaceTagDescription_exports = {};
__export(SpaceTagDescription_exports, {
  spaceTagFields: () => spaceTagFields,
  spaceTagOperations: () => spaceTagOperations
});
module.exports = __toCommonJS(SpaceTagDescription_exports);
const spaceTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["spaceTag"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a space tag",
        action: "Create a space tag"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a space tag",
        action: "Delete a space tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many space tags",
        action: "Get many space tags"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a space tag",
        action: "Update a space tag"
      }
    ],
    default: "create"
  }
];
const spaceTagFields = [
  /* -------------------------------------------------------------------------- */
  /*                                spaceTag:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Space ID",
    name: "space",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["create", "delete", "getAll", "update"]
      }
    },
    required: true
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Name or ID",
    name: "name",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["space"],
      loadOptionsMethod: "getTags"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["delete", "update"]
      }
    },
    required: true
  },
  {
    displayName: "New Name",
    name: "newName",
    type: "string",
    description: "New name to set for the tag",
    default: "",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["update"]
      }
    },
    required: true
  },
  {
    displayName: "Foreground Color",
    name: "foregroundColor",
    type: "color",
    default: "#000000",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["create", "update"]
      }
    },
    required: true
  },
  {
    displayName: "Background Color",
    name: "backgroundColor",
    type: "color",
    default: "#000000",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["create", "update"]
      }
    },
    required: true
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
        operation: ["getAll"]
      }
    },
    default: true,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["spaceTag"],
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
  spaceTagFields,
  spaceTagOperations
});
//# sourceMappingURL=SpaceTagDescription.js.map