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
var common_exports = {};
__export(common_exports, {
  containerResourceLocator: () => containerResourceLocator,
  itemResourceLocator: () => itemResourceLocator,
  paginationParameters: () => paginationParameters
});
module.exports = __toCommonJS(common_exports);
var import_constants = require("../helpers/constants");
var import_utils = require("../helpers/utils");
const containerResourceLocator = {
  displayName: "Container",
  name: "container",
  default: {
    mode: "list",
    value: ""
  },
  modes: [
    {
      displayName: "From list",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchContainers",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      hint: "Enter the container ID",
      placeholder: "e.g. AndersenFamily",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w+=,.@-]+$",
            errorMessage: "The container ID must follow the allowed pattern"
          }
        }
      ]
    }
  ],
  required: true,
  type: "resourceLocator"
};
const itemResourceLocator = {
  displayName: "Item",
  name: "item",
  default: {
    mode: "list",
    value: ""
  },
  displayOptions: {
    hide: {
      ...import_utils.untilContainerSelected
    }
  },
  modes: [
    {
      displayName: "From list",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchItems",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      hint: "Enter the item ID",
      placeholder: "e.g. AndersenFamily",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w+=,.@-]+$",
            errorMessage: "The item ID must follow the allowed pattern"
          }
        }
      ]
    }
  ],
  required: true,
  type: "resourceLocator"
};
const paginationParameters = [
  {
    displayName: "Return All",
    name: "returnAll",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    routing: {
      send: {
        paginate: "={{ $value }}"
      },
      operations: {
        pagination: {
          type: "generic",
          properties: {
            continue: `={{ !!$response.headers?.["${import_constants.HeaderConstants.X_MS_CONTINUATION}"] }}`,
            request: {
              headers: {
                [import_constants.HeaderConstants.X_MS_CONTINUATION]: `={{ $response.headers?.["${import_constants.HeaderConstants.X_MS_CONTINUATION}"] }}`
              }
            }
          }
        }
      }
    },
    type: "boolean"
  },
  {
    displayName: "Limit",
    name: "limit",
    default: 50,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    routing: {
      request: {
        headers: {
          [import_constants.HeaderConstants.X_MS_MAX_ITEM_COUNT]: "={{ $value || undefined }}"
        }
      }
    },
    type: "number",
    typeOptions: {
      minValue: 1
    },
    validateType: "number"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  containerResourceLocator,
  itemResourceLocator,
  paginationParameters
});
//# sourceMappingURL=common.js.map