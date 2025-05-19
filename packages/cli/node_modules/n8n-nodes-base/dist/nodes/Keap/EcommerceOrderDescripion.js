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
var EcommerceOrderDescripion_exports = {};
__export(EcommerceOrderDescripion_exports, {
  ecommerceOrderFields: () => ecommerceOrderFields,
  ecommerceOrderOperations: () => ecommerceOrderOperations
});
module.exports = __toCommonJS(EcommerceOrderDescripion_exports);
const ecommerceOrderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ecommerceOrder"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an ecommerce order",
        action: "Create an e-commerce order"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an ecommerce order",
        action: "Get an e-commerce order"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an ecommerce order",
        action: "Delete an e-commerce order"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many ecommerce orders",
        action: "Get many e-commerce orders"
      }
    ],
    default: "create"
  }
];
const ecommerceOrderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceOrder:create                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  {
    displayName: "Order Date",
    name: "orderDate",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  {
    displayName: "Order Title",
    name: "orderTitle",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  {
    displayName: "Order Type",
    name: "orderType",
    type: "options",
    options: [
      {
        name: "Offline",
        value: "offline"
      },
      {
        name: "Online",
        value: "online"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceOrder"]
      }
    },
    options: [
      {
        displayName: "Lead Affiliate ID",
        name: "leadAffiliateId",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      },
      {
        displayName: "Promo Codes",
        name: "promoCodes",
        type: "string",
        default: "",
        description: "Uses multiple strings separated by comma as promo codes. The corresponding discount will be applied to the order."
      },
      {
        displayName: "Sales Affiliate ID",
        name: "salesAffiliateId",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      }
    ]
  },
  {
    displayName: "Shipping Address",
    name: "addressUi",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: false
    },
    default: {},
    placeholder: "Add Address",
    displayOptions: {
      show: {
        resource: ["ecommerceOrder"],
        operation: ["create"]
      }
    },
    options: [
      {
        name: "addressValues",
        displayName: "Address",
        values: [
          {
            displayName: "Company",
            name: "company",
            type: "string",
            default: ""
          },
          {
            displayName: "Country Code Name or ID",
            name: "countryCode",
            type: "options",
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: {
              loadOptionsMethod: "getCountries"
            },
            default: ""
          },
          {
            displayName: "First Name",
            name: "firstName",
            type: "string",
            default: ""
          },
          {
            displayName: "Middle Name",
            name: "middleName",
            type: "string",
            default: ""
          },
          {
            displayName: "Last Name",
            name: "lastName",
            type: "string",
            default: ""
          },
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
            displayName: "Locality",
            name: "locality",
            type: "string",
            default: ""
          },
          {
            displayName: "Region",
            name: "region",
            type: "string",
            default: ""
          },
          {
            displayName: "Zip Code",
            name: "zipCode",
            type: "string",
            default: ""
          },
          {
            displayName: "Zip Four",
            name: "zipFour",
            type: "string",
            default: ""
          },
          {
            displayName: "Phone",
            name: "phone",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Order Items",
    name: "orderItemsUi",
    type: "fixedCollection",
    placeholder: "Add Order Item",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["ecommerceOrder"],
        operation: ["create"]
      }
    },
    options: [
      {
        name: "orderItemsValues",
        displayName: "Order Item",
        values: [
          {
            displayName: "Description",
            name: "description",
            type: "string",
            default: ""
          },
          {
            displayName: "Price",
            name: "price",
            type: "number",
            typeOptions: {
              minValue: 0
            },
            default: 0,
            description: "Overridable price of the product, if not specified, the default will be used"
          },
          {
            displayName: "Product ID",
            name: "product ID",
            type: "number",
            typeOptions: {
              minValue: 0
            },
            default: 0
          },
          {
            displayName: "Quantity",
            name: "quantity",
            type: "number",
            typeOptions: {
              minValue: 1
            },
            default: 1
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceOrder:delete                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Order ID",
    name: "orderId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceOrder:get                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Order ID",
    name: "orderId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["ecommerceOrder"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceOrder:getAll                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["ecommerceOrder"]
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
        operation: ["getAll"],
        resource: ["ecommerceOrder"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["ecommerceOrder"]
      }
    },
    options: [
      {
        displayName: "Since",
        name: "since",
        type: "dateTime",
        default: "",
        description: "Date to start searching from"
      },
      {
        displayName: "Until",
        name: "until",
        type: "dateTime",
        default: "",
        description: "Date to search to"
      },
      {
        displayName: "Paid",
        name: "paid",
        type: "boolean",
        default: false
      },
      {
        displayName: "Order",
        name: "order",
        type: "string",
        default: "",
        description: "Attribute to order items by"
      },
      {
        displayName: "Contact ID",
        name: "contactId",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      },
      {
        displayName: "Product ID",
        name: "productId",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ecommerceOrderFields,
  ecommerceOrderOperations
});
//# sourceMappingURL=EcommerceOrderDescripion.js.map