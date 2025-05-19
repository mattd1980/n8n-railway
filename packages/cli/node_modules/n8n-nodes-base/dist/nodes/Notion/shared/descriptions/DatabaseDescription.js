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
var DatabaseDescription_exports = {};
__export(DatabaseDescription_exports, {
  databaseFields: () => databaseFields,
  databaseOperations: () => databaseOperations
});
module.exports = __toCommonJS(DatabaseDescription_exports);
var import_constants = require("../constants");
const databaseOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["database"]
      },
      hide: {
        "@version": [1]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a database",
        action: "Get a database"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many databases",
        action: "Get many databases"
      },
      {
        name: "Search",
        value: "search",
        description: "Search databases using text search",
        action: "Search a database"
      }
    ],
    default: "get"
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        "@version": [1],
        resource: ["database"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a database",
        action: "Get a database"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many databases",
        action: "Get many databases"
      }
    ],
    default: "get"
  }
];
const databaseFields = [
  /* -------------------------------------------------------------------------- */
  /*                                database:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Database",
    name: "databaseId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        displayName: "Database",
        name: "list",
        type: "list",
        placeholder: "Select a Database...",
        typeOptions: {
          searchListMethod: "getDatabases",
          searchable: true
        }
      },
      {
        displayName: "Link",
        name: "url",
        type: "string",
        placeholder: "https://www.notion.so/0fe2f7de558b471eab07e9d871cdf4a9?v=f2d424ba0c404733a3f500c78c881610",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.databaseUrlValidationRegexp,
              errorMessage: "Not a valid Notion Database URL. Hint: use the URL of the database itself, not a page containing it."
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.databaseUrlExtractionRegexp
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        placeholder: "ab1545b247fb49fa92d6f4b49f4d8116",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.idValidationRegexp,
              errorMessage: "Not a valid Notion Database ID"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.idExtractionRegexp
        },
        url: '=https://www.notion.so/{{$value.replace(/-/g, "")}}'
      }
    ],
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["get"]
      }
    },
    description: "The Notion Database to get"
  },
  /* -------------------------------------------------------------------------- */
  /*                                database:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["database"],
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
        resource: ["database"],
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
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["getAll", "get"]
      },
      hide: {
        "@version": [1]
      }
    },
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  },
  /* -------------------------------------------------------------------------- */
  /*                                database:search                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Search Text",
    name: "text",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["search"]
      }
    },
    description: "The text to search for"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["search"]
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
        resource: ["database"],
        operation: ["search"],
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
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["search"]
      }
    },
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        resource: ["database"],
        operation: ["search"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Sort",
        name: "sort",
        placeholder: "Add Sort",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false
        },
        default: {},
        options: [
          {
            displayName: "Sort",
            name: "sortValue",
            values: [
              {
                displayName: "Direction",
                name: "direction",
                type: "options",
                options: [
                  {
                    name: "Ascending",
                    value: "ascending"
                  },
                  {
                    name: "Descending",
                    value: "descending"
                  }
                ],
                default: "descending",
                description: "The direction to sort"
              },
              {
                displayName: "Timestamp",
                name: "timestamp",
                type: "options",
                options: [
                  {
                    name: "Last Edited Time",
                    value: "last_edited_time"
                  }
                ],
                default: "last_edited_time",
                description: "The name of the timestamp to sort against"
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
  databaseFields,
  databaseOperations
});
//# sourceMappingURL=DatabaseDescription.js.map