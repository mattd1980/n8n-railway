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
var LocationDescription_exports = {};
__export(LocationDescription_exports, {
  locationFields: () => locationFields,
  locationOperations: () => locationOperations
});
module.exports = __toCommonJS(LocationDescription_exports);
const locationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["location"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a location",
        action: "Create a location"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a location",
        action: "Delete a location"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a location",
        action: "Get a location"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many locations",
        action: "Get many locations"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a location",
        action: "Update a location"
      }
    ],
    default: "create"
  }
];
const locationFields = [
  // ----------------------------------------
  //             location: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Name of the location",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["location"],
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
        resource: ["location"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Address",
        name: "address",
        placeholder: "Add Address Fields",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Address Details",
            name: "addressFields",
            values: [
              {
                displayName: "Line 1",
                name: "line1",
                type: "string",
                default: ""
              },
              {
                displayName: "Line 2",
                name: "line2",
                type: "string",
                default: ""
              },
              {
                displayName: "City",
                name: "city",
                type: "string",
                default: ""
              },
              {
                displayName: "Country",
                name: "country",
                type: "string",
                default: ""
              },
              {
                displayName: "State",
                name: "state",
                type: "string",
                default: ""
              },
              {
                displayName: "Zip Code",
                name: "zipcode",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //             location: delete
  // ----------------------------------------
  {
    displayName: "Location ID",
    name: "locationId",
    description: "ID of the location to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["location"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //              location: get
  // ----------------------------------------
  {
    displayName: "Location ID",
    name: "locationId",
    description: "ID of the location to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["location"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             location: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["location"],
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
        resource: ["location"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //             location: update
  // ----------------------------------------
  {
    displayName: "Location ID",
    name: "locationId",
    description: "ID of the location to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["location"],
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
        resource: ["location"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Address",
        name: "address",
        placeholder: "Add Address Fields",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Address Details",
            name: "addressFields",
            values: [
              {
                displayName: "Line 1",
                name: "line1",
                type: "string",
                default: ""
              },
              {
                displayName: "Line 2",
                name: "line2",
                type: "string",
                default: ""
              },
              {
                displayName: "City",
                name: "city",
                type: "string",
                default: ""
              },
              {
                displayName: "Country",
                name: "country",
                type: "string",
                default: ""
              },
              {
                displayName: "State",
                name: "state",
                type: "string",
                default: ""
              },
              {
                displayName: "Zip Code",
                name: "zipcode",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  locationFields,
  locationOperations
});
//# sourceMappingURL=LocationDescription.js.map