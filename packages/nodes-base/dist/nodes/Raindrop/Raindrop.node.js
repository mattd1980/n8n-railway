"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Raindrop_node_exports = {};
__export(Raindrop_node_exports, {
  Raindrop: () => Raindrop
});
module.exports = __toCommonJS(Raindrop_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_omit = __toESM(require("lodash/omit"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Raindrop {
  constructor() {
    this.description = {
      displayName: "Raindrop",
      name: "raindrop",
      icon: "file:raindrop.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Raindrop API",
      defaults: {
        name: "Raindrop"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "raindropOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Bookmark",
              value: "bookmark"
            },
            {
              name: "Collection",
              value: "collection"
            },
            {
              name: "Tag",
              value: "tag"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "collection"
        },
        ...import_descriptions.bookmarkOperations,
        ...import_descriptions.bookmarkFields,
        ...import_descriptions.collectionOperations,
        ...import_descriptions.collectionFields,
        ...import_descriptions.tagOperations,
        ...import_descriptions.tagFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCollections() {
          const responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", "/collections", {}, {});
          return responseData.items.map((item) => ({
            name: item.title,
            value: item._id
          }));
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "bookmark") {
          if (operation === "create") {
            const body = {
              link: this.getNodeParameter("link", i),
              collection: {
                $id: this.getNodeParameter("collectionId", i)
              }
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            if (additionalFields.pleaseParse === true) {
              body.pleaseParse = {};
              delete additionalFields.pleaseParse;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags.split(",").map((tag) => tag.trim());
            }
            const endpoint = "/raindrop";
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData.item;
          } else if (operation === "delete") {
            const bookmarkId = this.getNodeParameter("bookmarkId", i);
            const endpoint = `/raindrop/${bookmarkId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "DELETE", endpoint, {}, {});
          } else if (operation === "get") {
            const bookmarkId = this.getNodeParameter("bookmarkId", i);
            const endpoint = `/raindrop/${bookmarkId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.item;
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const collectionId = this.getNodeParameter("collectionId", i);
            const endpoint = `/raindrops/${collectionId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.items;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "update") {
            const bookmarkId = this.getNodeParameter("bookmarkId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            Object.assign(body, updateFields);
            if (updateFields.collectionId) {
              body.collection = {
                $id: updateFields.collectionId
              };
              delete updateFields.collectionId;
            }
            if (updateFields.pleaseParse === true) {
              body.pleaseParse = {};
              delete updateFields.pleaseParse;
            }
            if (updateFields.tags) {
              body.tags = updateFields.tags.split(",").map((tag) => tag.trim());
            }
            const endpoint = `/raindrop/${bookmarkId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "PUT", endpoint, {}, body);
            responseData = responseData.item;
          }
        } else if (resource === "collection") {
          if (operation === "create") {
            const body = {
              title: this.getNodeParameter("title", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            if (additionalFields.cover) {
              body.cover = [body.cover];
            }
            if (additionalFields.parentId) {
              body["parent.$id"] = parseInt(additionalFields.parentId, 10);
              delete additionalFields.parentId;
            }
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "POST", "/collection", {}, body);
            responseData = responseData.item;
          } else if (operation === "delete") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const endpoint = `/collection/${collectionId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "DELETE", endpoint, {}, {});
          } else if (operation === "get") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const endpoint = `/collection/${collectionId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.item;
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const endpoint = this.getNodeParameter("type", i) === "parent" ? "/collections" : "/collections/childrens";
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.items;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "update") {
            const collectionId = this.getNodeParameter("collectionId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            if (updateFields.parentId) {
              body["parent.$id"] = parseInt(updateFields.parentId, 10);
              delete updateFields.parentId;
            }
            Object.assign(body, (0, import_omit.default)(updateFields, "binaryPropertyName"));
            const endpoint = `/collection/${collectionId}`;
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "PUT", endpoint, {}, body);
            responseData = responseData.item;
            if (updateFields.cover) {
              const binaryPropertyName = updateFields.cover;
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
              const formData = {
                cover: {
                  value: dataBuffer,
                  options: {
                    filename: binaryData.fileName,
                    contentType: binaryData.mimeType
                  }
                }
              };
              const requestEndpoint = `/collection/${collectionId}/cover`;
              responseData = await import_GenericFunctions.raindropApiRequest.call(
                this,
                "PUT",
                requestEndpoint,
                {},
                {},
                { "Content-Type": "multipart/form-data", formData }
              );
              responseData = responseData.item;
            }
          }
        } else if (resource === "user") {
          if (operation === "get") {
            const self = this.getNodeParameter("self", i);
            let endpoint = "/user";
            if (self === false) {
              const userId = this.getNodeParameter("userId", i);
              endpoint += `/${userId}`;
            }
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.user;
          }
        } else if (resource === "tag") {
          if (operation === "delete") {
            let endpoint = "/tags";
            const body = {
              tags: this.getNodeParameter("tags", i).split(",")
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.collectionId) {
              endpoint += `/${additionalFields.collectionId}`;
            }
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "DELETE", endpoint, {}, body);
          } else if (operation === "getAll") {
            let endpoint = "/tags";
            const returnAll = this.getNodeParameter("returnAll", i);
            const filter = this.getNodeParameter("filters", i);
            if (filter.collectionId) {
              endpoint += `/${filter.collectionId}`;
            }
            responseData = await import_GenericFunctions.raindropApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData.items;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.slice(0, limit);
            }
          }
        }
        Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Raindrop
});
//# sourceMappingURL=Raindrop.node.js.map