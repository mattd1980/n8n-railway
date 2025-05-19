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
var delete_operation_exports = {};
__export(delete_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(delete_operation_exports);
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
    description: 'ID of the site containing the collection whose items to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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
    description: 'ID of the collection whose items to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Item ID",
    name: "itemId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the item to operate on"
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["deleteItem"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      const collectionId = this.getNodeParameter("collectionId", i);
      const itemId = this.getNodeParameter("itemId", i);
      let responseData = await import_GenericFunctions.webflowApiRequest.call(
        this,
        "DELETE",
        `/collections/${collectionId}/items/${itemId}`
      );
      if (responseData.statusCode === 204) {
        responseData = { success: true };
      } else {
        responseData = { success: false };
      }
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)(responseData),
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
//# sourceMappingURL=delete.operation.js.map