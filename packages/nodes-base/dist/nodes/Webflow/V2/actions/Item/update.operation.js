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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_GenericFunctions = require("../../../GenericFunctions");
const properties = [
  {
    displayName: "Site Name or ID",
    name: "siteId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getSites"
    },
    default: "",
    description: 'ID of the site containing the collection whose items to add to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Collection Name or ID",
    name: "collectionId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getCollections",
      loadOptionsDependsOn: ["siteId"]
    },
    default: "",
    description: 'ID of the collection to add an item to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Item ID",
    name: "itemId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the item to update"
  },
  {
    displayName: "Live",
    name: "live",
    type: "boolean",
    required: true,
    default: false,
    description: "Whether the item should be published on the live site"
  },
  {
    displayName: "Fields",
    name: "fieldsUi",
    placeholder: "Add Field",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Field",
        name: "fieldValues",
        values: [
          {
            displayName: "Field Name or ID",
            name: "fieldId",
            type: "options",
            typeOptions: {
              loadOptionsMethod: "getFields",
              loadOptionsDependsOn: ["collectionId"]
            },
            default: "",
            description: 'Field to set for the item to create. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: "",
            description: "Value to set for the item to create"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  let responseData;
  for (let i = 0; i < items.length; i++) {
    try {
      const collectionId = this.getNodeParameter("collectionId", i);
      const itemId = this.getNodeParameter("itemId", i);
      const uiFields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
      const live = this.getNodeParameter("live", i);
      const fieldData = {};
      uiFields.forEach((data) => fieldData[data.fieldId] = data.fieldValue);
      const body = {
        fieldData
      };
      responseData = await import_GenericFunctions.webflowApiRequest.call(
        this,
        "PATCH",
        `/collections/${collectionId}/items/${itemId}${live ? "/live" : ""}`,
        body
      );
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)(responseData.body),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ json: { message: error.message, error } });
        continue;
      }
      throw error;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map