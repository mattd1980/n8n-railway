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
var CollectionDescription_exports = {};
__export(CollectionDescription_exports, {
  collectionFields: () => collectionFields,
  collectionOperations: () => collectionOperations
});
module.exports = __toCommonJS(CollectionDescription_exports);
const collectionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a collection"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a collection"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many collections"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a collection"
      }
    ],
    displayOptions: {
      show: {
        resource: ["collection"]
      }
    }
  }
];
const collectionFields = [
  // ----------------------------------
  //       collection: shared
  // ----------------------------------
  {
    displayName: "Collection ID",
    name: "collectionId",
    type: "string",
    required: true,
    description: "The identifier of the collection",
    default: "",
    placeholder: "5e59c8c7-e05a-4d17-8e85-acc301343926",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["delete", "get", "update"]
      }
    }
  },
  // ----------------------------------
  //       collection: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 10,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------
  //       collection: update
  // ----------------------------------
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    required: true,
    options: [
      {
        displayName: "Group Names or IDs",
        name: "groups",
        type: "multiOptions",
        description: 'The group to assign this collection to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getGroups"
        }
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        description: "The external identifier to set to this collection",
        default: ""
      }
    ],
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["update"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionFields,
  collectionOperations
});
//# sourceMappingURL=CollectionDescription.js.map