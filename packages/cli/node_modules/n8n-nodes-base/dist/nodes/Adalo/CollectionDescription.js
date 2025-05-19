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
  collectionFields: () => collectionFields
});
module.exports = __toCommonJS(CollectionDescription_exports);
const collectionFields = [
  {
    displayName: "Row ID",
    name: "rowId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["get", "delete", "update"],
        resource: ["collection"]
      }
    },
    default: "",
    required: true
  },
  /**
   * create / update
   */
  {
    displayName: "Data to Send",
    name: "dataToSend",
    type: "options",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMapInputData",
        description: "Use when node input properties match destination column names"
      },
      {
        name: "Define Below for Each Column",
        value: "defineBelow",
        description: "Set the value for each destination column"
      }
    ],
    displayOptions: {
      show: {
        operation: ["create", "update"],
        resource: ["collection"]
      }
    },
    default: "defineBelow",
    description: "Whether to insert the input data this node receives in the new row"
  },
  {
    displayName: "Inputs to Ignore",
    name: "inputsToIgnore",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create", "update"],
        dataToSend: ["autoMapInputData"],
        resource: ["collection"]
      }
    },
    default: "",
    description: "List of input properties to avoid sending, separated by commas. Leave empty to send all properties.",
    placeholder: "Enter properties..."
  },
  {
    displayName: "Fields to Send",
    name: "fieldsUi",
    placeholder: "Add Field",
    type: "fixedCollection",
    description: "Field must be defined in the collection, otherwise it will be ignored. If field defined in the collection is not set here, it will be set to null.",
    typeOptions: {
      multipleValueButtonText: "Add Field to Send",
      multipleValues: true
    },
    displayOptions: {
      show: {
        operation: ["create", "update"],
        dataToSend: ["defineBelow"],
        resource: ["collection"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "fieldValues",
        values: [
          {
            displayName: "Field ID",
            name: "fieldId",
            type: "string",
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  /**
   * getAll
   */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["collection"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["collection"],
        returnAll: [false]
      }
    },
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectionFields
});
//# sourceMappingURL=CollectionDescription.js.map