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
    displayOptions: {
      show: {
        resource: ["collection"]
      }
    },
    options: [
      {
        name: "Create an Entry",
        value: "create",
        description: "Create a collection entry",
        action: "Create a collection entry"
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many
        name: "Get Many Entries",
        value: "getAll",
        description: "Get many collection entries",
        action: "Get many collection entries"
      },
      {
        name: "Update an Entry",
        value: "update",
        description: "Update a collection entry",
        action: "Update a collection entry"
      }
    ],
    default: "getAll"
  }
];
const collectionFields = [
  {
    displayName: "Collection Name or ID",
    name: "collection",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "getCollections"
    },
    displayOptions: {
      show: {
        resource: ["collection"]
      }
    },
    required: true,
    description: 'Name of the collection to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  // Collection:entry:getAll
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["collection"]
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
        resource: ["collection"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
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
        resource: ["collection"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        placeholder: "_id,name",
        description: "Comma-separated list of fields to get"
      },
      {
        displayName: "Filter Query",
        name: "filter",
        type: "json",
        default: "",
        typeOptions: {
          alwaysOpenEditWindow: true
        },
        placeholder: '{"name": "Jim"}',
        description: 'Filter query in <a href="https://jeroen.github.io/mongolite/query-data.html">Mongolite format</a>'
      },
      {
        displayName: "Language",
        name: "language",
        type: "string",
        default: "",
        description: "Return normalized language fields"
      },
      {
        displayName: "Populate",
        name: "populate",
        type: "boolean",
        default: true,
        description: "Whether to resolve linked collection items"
      },
      {
        displayName: "RAW Data",
        name: "rawData",
        type: "boolean",
        default: false,
        description: "Whether to return the data exactly in the way it got received from the API"
      },
      {
        displayName: "Skip",
        name: "skip",
        type: "number",
        default: "",
        description: "Skip number of entries"
      },
      {
        displayName: "Sort Query",
        name: "sort",
        type: "json",
        default: "",
        placeholder: '{"price": -1}',
        description: 'Sort query in <a href="https://jeroen.github.io/mongolite/query-data.html">Mongolite format</a>'
      }
    ]
  },
  // Collection:entry:update
  {
    displayName: "Entry ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["update"]
      }
    }
  },
  // Collection:entry:create
  // Collection:entry:update
  {
    displayName: "JSON Data Fields",
    name: "jsonDataFields",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["create", "update"]
      }
    },
    description: "Whether new entry fields should be set via the value-key pair UI or JSON"
  },
  {
    displayName: "Entry Data",
    name: "dataFieldsJson",
    type: "json",
    default: "",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    displayOptions: {
      show: {
        jsonDataFields: [true],
        resource: ["collection"],
        operation: ["create", "update"]
      }
    },
    description: "Entry data to send as JSON"
  },
  {
    displayName: "Entry Data",
    name: "dataFieldsUi",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        jsonDataFields: [false],
        resource: ["collection"],
        operation: ["create", "update"]
      }
    },
    options: [
      {
        displayName: "Field",
        name: "field",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the field"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the field"
          }
        ]
      }
    ],
    description: "Entry data to send"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionFields,
  collectionOperations
});
//# sourceMappingURL=CollectionDescription.js.map