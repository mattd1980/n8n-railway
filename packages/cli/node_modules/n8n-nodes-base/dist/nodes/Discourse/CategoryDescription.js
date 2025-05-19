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
var CategoryDescription_exports = {};
__export(CategoryDescription_exports, {
  categoryFields: () => categoryFields,
  categoryOperations: () => categoryOperations
});
module.exports = __toCommonJS(CategoryDescription_exports);
const categoryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a category",
        action: "Create a category"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many categories",
        action: "Get many categories"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a category",
        action: "Update a category"
      }
    ],
    default: "create"
  }
];
const categoryFields = [
  /* -------------------------------------------------------------------------- */
  /*                                category:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["create"]
      }
    },
    default: "",
    description: "Name of the category"
  },
  {
    displayName: "Color",
    name: "color",
    type: "color",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["create"]
      }
    },
    default: "0000FF",
    description: "Color of the category"
  },
  {
    displayName: "Text Color",
    name: "textColor",
    type: "color",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["create"]
      }
    },
    default: "0000FF",
    description: "Text color of the category"
  },
  /* -------------------------------------------------------------------------- */
  /*                                category:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["category"],
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
        resource: ["category"],
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
  },
  /* -------------------------------------------------------------------------- */
  /*                                category:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Category ID",
    name: "categoryId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["update"]
      }
    },
    default: "",
    description: "ID of the category"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["update"]
      }
    },
    default: "",
    description: "New name of the category"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["category"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Color",
        name: "color",
        type: "color",
        default: "0000FF",
        description: "Color of the category"
      },
      {
        displayName: "Text Color",
        name: "textColor",
        type: "color",
        default: "0000FF",
        description: "Text color of the category"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categoryFields,
  categoryOperations
});
//# sourceMappingURL=CategoryDescription.js.map