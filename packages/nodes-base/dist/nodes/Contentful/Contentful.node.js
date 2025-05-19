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
var Contentful_node_exports = {};
__export(Contentful_node_exports, {
  Contentful: () => Contentful
});
module.exports = __toCommonJS(Contentful_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var AssetDescription = __toESM(require("./AssetDescription"));
var ContentTypeDescription = __toESM(require("./ContentTypeDescription"));
var EntryDescription = __toESM(require("./EntryDescription"));
var import_GenericFunctions = require("./GenericFunctions");
var LocaleDescription = __toESM(require("./LocaleDescription"));
var SpaceDescription = __toESM(require("./SpaceDescription"));
class Contentful {
  constructor() {
    this.description = {
      displayName: "Contentful",
      name: "contentful",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:contentful.png",
      group: ["input"],
      version: 1,
      description: "Consume Contentful API",
      defaults: {
        name: "Contentful"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "contentfulApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Source",
          name: "source",
          type: "options",
          default: "deliveryApi",
          description: "Pick where your data comes from, delivery or preview API",
          options: [
            {
              name: "Delivery API",
              value: "deliveryApi"
            },
            {
              name: "Preview API",
              value: "previewApi"
            }
          ]
        },
        // Resources:
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            AssetDescription.resource,
            ContentTypeDescription.resource,
            EntryDescription.resource,
            LocaleDescription.resource,
            SpaceDescription.resource
          ],
          default: "entry"
        },
        // Operations:
        ...SpaceDescription.operations,
        ...ContentTypeDescription.operations,
        ...EntryDescription.operations,
        ...AssetDescription.operations,
        ...LocaleDescription.operations,
        // Resource specific fields:
        ...SpaceDescription.fields,
        ...ContentTypeDescription.fields,
        ...EntryDescription.fields,
        ...AssetDescription.fields,
        ...LocaleDescription.fields
      ]
    };
  }
  async execute() {
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const items = this.getInputData();
    const returnData = [];
    const qs = {};
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "space") {
          if (operation === "get") {
            const credentials = await this.getCredentials("contentfulApi");
            responseData = await import_GenericFunctions.contentfulApiRequest.call(
              this,
              "GET",
              `/spaces/${credentials?.spaceId}`
            );
          }
        }
        if (resource === "contentType") {
          if (operation === "get") {
            const credentials = await this.getCredentials("contentfulApi");
            const env = this.getNodeParameter("environmentId", 0);
            const id = this.getNodeParameter("contentTypeId", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            responseData = await import_GenericFunctions.contentfulApiRequest.call(
              this,
              "GET",
              `/spaces/${credentials?.spaceId}/environments/${env}/content_types/${id}`
            );
            if (!additionalFields.rawData) {
              responseData = responseData.fields;
            }
          }
        }
        if (resource === "entry") {
          if (operation === "get") {
            const credentials = await this.getCredentials("contentfulApi");
            const env = this.getNodeParameter("environmentId", 0);
            const id = this.getNodeParameter("entryId", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            responseData = await import_GenericFunctions.contentfulApiRequest.call(
              this,
              "GET",
              `/spaces/${credentials?.spaceId}/environments/${env}/entries/${id}`,
              {},
              qs
            );
            if (!additionalFields.rawData) {
              responseData = responseData.fields;
            }
          } else if (operation === "getAll") {
            const credentials = await this.getCredentials("contentfulApi");
            const returnAll = this.getNodeParameter("returnAll", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const rawData = additionalFields.rawData;
            additionalFields.rawData = void 0;
            const env = this.getNodeParameter("environmentId", i);
            Object.assign(qs, additionalFields);
            if (qs.equal) {
              const [atribute, value] = qs.equal.split("=");
              qs[atribute] = value;
              delete qs.equal;
            }
            if (qs.notEqual) {
              const [atribute, value] = qs.notEqual.split("=");
              qs[atribute] = value;
              delete qs.notEqual;
            }
            if (qs.include) {
              const [atribute, value] = qs.include.split("=");
              qs[atribute] = value;
              delete qs.include;
            }
            if (qs.exclude) {
              const [atribute, value] = qs.exclude.split("=");
              qs[atribute] = value;
              delete qs.exclude;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.contentfulApiRequestAllItems.call(
                this,
                "items",
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/entries`,
                {},
                qs
              );
              if (!rawData) {
                const assets = [];
                responseData.map((asset) => {
                  assets.push(asset.fields);
                });
                responseData = assets;
              }
            } else {
              const limit = this.getNodeParameter("limit", 0);
              qs.limit = limit;
              responseData = await import_GenericFunctions.contentfulApiRequest.call(
                this,
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/entries`,
                {},
                qs
              );
              responseData = responseData.items;
              if (!rawData) {
                const assets = [];
                responseData.map((asset) => {
                  assets.push(asset.fields);
                });
                responseData = assets;
              }
            }
          }
        }
        if (resource === "asset") {
          if (operation === "get") {
            const credentials = await this.getCredentials("contentfulApi");
            const env = this.getNodeParameter("environmentId", 0);
            const id = this.getNodeParameter("assetId", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            responseData = await import_GenericFunctions.contentfulApiRequest.call(
              this,
              "GET",
              `/spaces/${credentials?.spaceId}/environments/${env}/assets/${id}`,
              {},
              qs
            );
            if (!additionalFields.rawData) {
              responseData = responseData.fields;
            }
          } else if (operation === "getAll") {
            const credentials = await this.getCredentials("contentfulApi");
            const returnAll = this.getNodeParameter("returnAll", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const rawData = additionalFields.rawData;
            additionalFields.rawData = void 0;
            const env = this.getNodeParameter("environmentId", i);
            Object.assign(qs, additionalFields);
            if (qs.equal) {
              const [atribute, value] = qs.equal.split("=");
              qs[atribute] = value;
              delete qs.equal;
            }
            if (qs.notEqual) {
              const [atribute, value] = qs.notEqual.split("=");
              qs[atribute] = value;
              delete qs.notEqual;
            }
            if (qs.include) {
              const [atribute, value] = qs.include.split("=");
              qs[atribute] = value;
              delete qs.include;
            }
            if (qs.exclude) {
              const [atribute, value] = qs.exclude.split("=");
              qs[atribute] = value;
              delete qs.exclude;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.contentfulApiRequestAllItems.call(
                this,
                "items",
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/assets`,
                {},
                qs
              );
              if (!rawData) {
                const assets = [];
                responseData.map((asset) => {
                  assets.push(asset.fields);
                });
                responseData = assets;
              }
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.limit = limit;
              responseData = await import_GenericFunctions.contentfulApiRequest.call(
                this,
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/assets`,
                {},
                qs
              );
              responseData = responseData.items;
              if (!rawData) {
                const assets = [];
                responseData.map((asset) => {
                  assets.push(asset.fields);
                });
                responseData = assets;
              }
            }
          }
        }
        if (resource === "locale") {
          if (operation === "getAll") {
            const credentials = await this.getCredentials("contentfulApi");
            const returnAll = this.getNodeParameter("returnAll", 0);
            const env = this.getNodeParameter("environmentId", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.contentfulApiRequestAllItems.call(
                this,
                "items",
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/locales`,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", 0);
              qs.limit = limit;
              responseData = await import_GenericFunctions.contentfulApiRequest.call(
                this,
                "GET",
                `/spaces/${credentials?.spaceId}/environments/${env}/locales`,
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {} });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contentful
});
//# sourceMappingURL=Contentful.node.js.map