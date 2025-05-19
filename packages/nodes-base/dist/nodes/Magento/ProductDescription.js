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
var import_GenericFunctions = require("./GenericFunctions");
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
        description: "Get a product",
        action: "Get a product"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many products",
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
  /* -------------------------------------------------------------------------- */
  /*                                   product:create			                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "SKU",
    name: "sku",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["create", "update"]
      }
    },
    description: "Stock-keeping unit of the product"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Attribute Set Name or ID",
    name: "attributeSetId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["create"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getAttributeSets"
    },
    default: ""
  },
  {
    displayName: "Price",
    name: "price",
    type: "number",
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["create"]
      }
    },
    default: 0
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
    options: [...(0, import_GenericFunctions.getProductOptionalFields)()]
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
    options: [...(0, import_GenericFunctions.getProductOptionalFields)()]
  },
  /* -------------------------------------------------------------------------- */
  /*                                   product:delete			                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "SKU",
    name: "sku",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["product"],
        operation: ["delete", "get"]
      }
    },
    description: "Stock-keeping unit of the product"
  },
  /* -------------------------------------------------------------------------- */
  /*                                   product:getAll			                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["product"],
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
        resource: ["product"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  ...(0, import_GenericFunctions.getSearchFilters)(
    "product",
    //'getProductAttributesFields',
    "getFilterableProductAttributes",
    "getSortableProductAttributes"
  )
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productFields,
  productOperations
});
//# sourceMappingURL=ProductDescription.js.map