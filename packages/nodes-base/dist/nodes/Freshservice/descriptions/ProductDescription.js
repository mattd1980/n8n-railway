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
var ProductDescription_exports = {};
__export(ProductDescription_exports, {
  productFields: () => productFields,
  productOperations: () => productOperations
});
module.exports = __toCommonJS(ProductDescription_exports);
const productOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["product"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a product",
        action: "Create a product"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a product",
        action: "Delete a product"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a product",
        action: "Get a product"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many products",
        action: "Get many products"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a product",
        action: "Update a product"
      }
    ],
    default: "create"
  }
];
const productFields = [
  // ----------------------------------------
  //             product: create
  // ----------------------------------------
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
        resource: ["product"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["product"],
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
        resource: ["product"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "HTML supported"
      },
      {
        displayName: "Manufacturer",
        name: "manufacturer",
        type: "string",
        default: ""
      },
      {
        displayName: "Mode of Procurement",
        name: "mode_of_procurement",
        type: "options",
        default: "Buy",
        options: [
          {
            name: "Buy",
            value: "Buy"
          },
          {
            name: "Lease",
            value: "Lease"
          },
          {
            name: "Both",
            value: "Both"
          }
        ]
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "In Production",
        options: [
          {
            name: "In Production",
            value: "In Production"
          },
          {
            name: "In Pipeline",
            value: "In Pipeline"
          },
          {
            name: "Retired",
            value: "Retired"
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //             product: delete
  // ----------------------------------------
  {
    displayName: "Product ID",
    name: "productId",
    description: "ID of the product to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //               product: get
  // ----------------------------------------
  {
    displayName: "Product ID",
    name: "productId",
    description: "ID of the product to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             product: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["product"],
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
        resource: ["product"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //             product: update
  // ----------------------------------------
  {
    displayName: "Product ID",
    name: "productId",
    description: "ID of the product to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["product"],
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
        resource: ["product"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Asset Type Name or ID",
        name: "asset_type_id",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getAssetTypes"
        }
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "HTML supported"
      },
      {
        displayName: "Manufacturer",
        name: "manufacturer",
        type: "string",
        default: ""
      },
      {
        displayName: "Mode of Procurement",
        name: "mode_of_procurement",
        type: "options",
        default: "Buy",
        options: [
          {
            name: "Buy",
            value: "Buy"
          },
          {
            name: "Lease",
            value: "Lease"
          },
          {
            name: "Both",
            value: "Both"
          }
        ]
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "In Production",
        options: [
          {
            name: "In Production",
            value: "In Production"
          },
          {
            name: "In Pipeline",
            value: "In Pipeline"
          },
          {
            name: "Retired",
            value: "Retired"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productFields,
  productOperations
});
//# sourceMappingURL=ProductDescription.js.map