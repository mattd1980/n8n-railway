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
var AssetDescription_exports = {};
__export(AssetDescription_exports, {
  assetFields: () => assetFields,
  assetOperations: () => assetOperations
});
module.exports = __toCommonJS(AssetDescription_exports);
const assetOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["asset"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an asset",
        action: "Create an asset"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an asset",
        action: "Delete an asset"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an asset",
        action: "Get an asset"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many assets",
        action: "Get many assets"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an asset",
        action: "Update an asset"
      }
    ],
    default: "create"
  }
];
const assetFields = [
  // ----------------------------------------
  //              asset: create
  // ----------------------------------------
  {
    displayName: "Asset Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Asset Type Name or ID",
    name: "assetTypeId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getAssetTypes"
    },
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Asset Fields",
    name: "assetFieldsUi",
    placeholder: "Add Asset Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        name: "assetFieldValue",
        displayName: "Asset Field",
        values: [
          {
            displayName: "Name or ID",
            name: "name",
            type: "options",
            typeOptions: {
              loadOptionsDependsOn: ["assetTypeId"],
              loadOptionsMethod: "getAssetTypeFields"
            },
            default: "",
            description: 'The ID of the field to add custom field to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "The value to set on custom field"
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //              asset: delete
  // ----------------------------------------
  {
    displayName: "Asset Display ID",
    name: "assetDisplayId",
    description: "Display ID of the asset to delete. Do not confuse with asset ID.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                asset: get
  // ----------------------------------------
  {
    displayName: "Asset Display ID",
    name: "assetDisplayId",
    description: "Display ID of the asset to retrieve. Do not confuse with asset ID.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //              asset: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["asset"],
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
        resource: ["asset"],
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
        resource: ["asset"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Agent Name or ID",
        name: "agent_id",
        type: "options",
        default: "",
        description: 'ID of the agent by whom the asset is managed. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getAgents"
        }
      },
      {
        displayName: "Asset State",
        name: "asset_state",
        type: "string",
        default: "",
        description: 'Status of the asset to filter by. For example, "In use".'
      },
      {
        displayName: "Asset Type Name or ID",
        name: "asset_type_id",
        type: "options",
        default: "",
        description: 'ID of the asset type to filter by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getAssetTypes"
        }
      },
      {
        displayName: "Department Name or ID",
        name: "department_id",
        type: "options",
        default: "",
        description: 'ID of the department to which the asset belongs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getDepartments"
        }
      },
      {
        displayName: "Location Name or ID",
        name: "location_id",
        type: "options",
        default: "",
        description: 'ID of the location to filter by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getLocations"
        }
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Display name of the asset to filter by"
      }
    ]
  },
  // ----------------------------------------
  //              asset: update
  // ----------------------------------------
  {
    displayName: "Asset Display ID",
    name: "assetDisplayId",
    description: "Display ID of the asset to update. Do not confuse with asset ID.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Asset Fields",
    name: "assetFieldsUi",
    placeholder: "Add Asset Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["asset"],
        operation: ["update"]
      }
    },
    default: {},
    options: [
      {
        name: "assetFieldValue",
        displayName: "Asset Field",
        values: [
          {
            displayName: "Name or ID",
            name: "name",
            type: "options",
            typeOptions: {
              loadOptionsDependsOn: ["assetTypeId"],
              loadOptionsMethod: "getAssetTypeFields"
            },
            default: "",
            description: 'The ID of the field to add custom field to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "The value to set on custom field"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assetFields,
  assetOperations
});
//# sourceMappingURL=AssetDescription.js.map