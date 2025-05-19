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
        name: "Create",
        value: "create",
        action: "Create a collection"
      },
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
  //       collection: create
  // ----------------------------------
  {
    displayName: "Title",
    name: "title",
    type: "string",
    required: true,
    default: "",
    description: "Title of the collection to create",
    displayOptions: {
      show: {
        resource: ["collection"],
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
        resource: ["collection"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Cover",
        name: "cover",
        type: "string",
        default: "",
        description: "URL of an image to use as cover for the collection"
      },
      {
        displayName: "Public",
        name: "public",
        type: "boolean",
        default: false,
        description: "Whether the collection will be accessible without authentication"
      },
      {
        displayName: "Parent ID",
        name: "parentId",
        type: "string",
        default: "",
        description: "ID of this collection's parent collection, if it is a child collection"
      },
      {
        displayName: "Sort Order",
        name: "sort",
        type: "number",
        default: 1,
        description: "Descending sort order of this collection. The number is the position of the collection among all the collections with the same parent ID."
      },
      {
        displayName: "View",
        name: "view",
        type: "options",
        default: "list",
        description: "View style of this collection",
        options: [
          {
            name: "List",
            value: "list"
          },
          {
            name: "Simple",
            value: "simple"
          },
          {
            name: "Grid",
            value: "grid"
          },
          {
            name: "Masonry",
            value: "Masonry"
          }
        ]
      }
    ]
  },
  // ----------------------------------
  //       collection: delete
  // ----------------------------------
  {
    displayName: "Collection ID",
    name: "collectionId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the collection to delete",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------
  //       collection: get
  // ----------------------------------
  {
    displayName: "Collection ID",
    name: "collectionId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the collection to retrieve",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //       collection: getAll
  // ----------------------------------
  {
    displayName: "Type",
    name: "type",
    type: "options",
    required: true,
    default: "parent",
    displayOptions: {
      show: {
        resource: ["collection"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        name: "Parent",
        value: "parent",
        description: "Root-level collections"
      },
      {
        name: "Children",
        value: "children",
        description: "Nested collections"
      }
    ]
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["collection"],
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
        resource: ["collection"],
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
  // ----------------------------------
  //       collection: update
  // ----------------------------------
  {
    displayName: "Collection ID",
    name: "collectionId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the collection to update",
    displayOptions: {
      show: {
        resource: ["collection"],
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
        resource: ["collection"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Cover",
        name: "cover",
        type: "string",
        default: "data",
        placeholder: "",
        description: "Name of the binary property containing the data for the image to upload as a cover"
      },
      {
        displayName: "Public",
        name: "public",
        type: "boolean",
        default: false,
        description: "Whether the collection will be accessible without authentication"
      },
      {
        displayName: "Parent ID",
        name: "parentId",
        type: "string",
        default: "",
        description: "ID of this collection's parent collection, if it is a child collection"
      },
      {
        displayName: "Sort Order",
        name: "sort",
        type: "number",
        default: 1,
        description: "Descending sort order of this collection. The number is the position of the collection among all the collections with the same parent ID."
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "Title of the collection to update"
      },
      {
        displayName: "View",
        name: "view",
        type: "options",
        default: "list",
        description: "View style of this collection",
        options: [
          {
            name: "List",
            value: "list"
          },
          {
            name: "Simple",
            value: "simple"
          },
          {
            name: "Grid",
            value: "grid"
          },
          {
            name: "Masonry",
            value: "Masonry"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionFields,
  collectionOperations
});
//# sourceMappingURL=CollectionDescription.js.map