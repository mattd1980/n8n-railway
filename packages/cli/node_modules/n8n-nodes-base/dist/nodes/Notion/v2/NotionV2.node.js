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
var NotionV2_node_exports = {};
__export(NotionV2_node_exports, {
  NotionV2: () => NotionV2
});
module.exports = __toCommonJS(NotionV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_methods = require("./methods");
var import_VersionDescription = require("./VersionDescription");
var import_GenericFunctions = require("../shared/GenericFunctions");
var import_methods2 = require("../shared/methods");
class NotionV2 {
  constructor(baseDescription) {
    this.methods = { listSearch: import_methods2.listSearch, loadOptions: import_methods.loadOptions };
    this.description = {
      ...baseDescription,
      ...import_VersionDescription.versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const nodeVersion = this.getNode().typeVersion;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const itemsLength = items.length;
    const timezone = this.getTimezone();
    const qs = {};
    let returnData = [];
    let responseData;
    let download = false;
    if (resource === "block") {
      if (operation === "append") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const blockId = import_GenericFunctions.extractBlockId.call(this, nodeVersion, i);
            const blockValues = this.getNodeParameter(
              "blockUi.blockValues",
              i,
              []
            );
            (0, import_GenericFunctions.extractDatabaseMentionRLC)(blockValues);
            const body = {
              children: (0, import_GenericFunctions.formatBlocks)(blockValues)
            };
            const block = await import_GenericFunctions.notionApiRequest.call(
              this,
              "PATCH",
              `/blocks/${blockId}/children`,
              body
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(block),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const blockId = import_GenericFunctions.extractBlockId.call(this, nodeVersion, i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const fetchNestedBlocks = this.getNodeParameter("fetchNestedBlocks", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "GET",
                `/blocks/${blockId}/children`,
                {}
              );
              if (fetchNestedBlocks) {
                responseData = await import_GenericFunctions.notionApiRequestGetBlockChildrens.call(this, responseData);
              }
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.page_size = limit;
              responseData = await import_GenericFunctions.notionApiRequest.call(
                this,
                "GET",
                `/blocks/${blockId}/children`,
                {},
                qs
              );
              const results = responseData.results;
              if (fetchNestedBlocks) {
                responseData = await import_GenericFunctions.notionApiRequestGetBlockChildrens.call(
                  this,
                  results,
                  [],
                  limit
                );
              } else {
                responseData = results;
              }
            }
            responseData = responseData.map((_data) => ({
              object: _data.object,
              parent_id: blockId,
              ..._data
            }));
            if (nodeVersion > 2) {
              const simplifyOutput = this.getNodeParameter("simplifyOutput", i);
              if (simplifyOutput) {
                responseData = (0, import_GenericFunctions.simplifyBlocksOutput)(responseData, blockId);
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
    }
    if (resource === "database") {
      if (operation === "get") {
        const simple = this.getNodeParameter("simple", 0);
        for (let i = 0; i < itemsLength; i++) {
          try {
            const databaseId = (0, import_GenericFunctions.extractDatabaseId)(
              this.getNodeParameter("databaseId", i, "", { extractValue: true })
            );
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download)[0];
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "getAll") {
        const simple = this.getNodeParameter("simple", 0);
        for (let i = 0; i < itemsLength; i++) {
          try {
            const body = {
              filter: { property: "object", value: "database" }
            };
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                "/search",
                body
              );
            } else {
              body.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.notionApiRequest.call(this, "POST", "/search", body);
              responseData = responseData.results;
            }
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "search") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const text = this.getNodeParameter("text", i);
            const options = this.getNodeParameter("options", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simple = this.getNodeParameter("simple", i);
            const body = {
              filter: {
                property: "object",
                value: "database"
              }
            };
            if (text) {
              body.query = text;
            }
            if (options.sort) {
              const sort = options.sort?.sortValue || {};
              body.sort = sort;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                "/search",
                body
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                "/search",
                body
              );
              responseData = responseData.splice(0, qs.limit);
            }
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
    }
    if (resource === "databasePage") {
      if (operation === "create") {
        const databaseId = this.getNodeParameter("databaseId", 0, "", {
          extractValue: true
        });
        const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
        let titleKey = "";
        for (const key of Object.keys(properties)) {
          if (properties[key].type === "title") {
            titleKey = key;
          }
        }
        for (let i = 0; i < itemsLength; i++) {
          try {
            const title = this.getNodeParameter("title", i);
            const simple = this.getNodeParameter("simple", i);
            const body = {
              parent: {},
              properties: {}
            };
            if (title !== "") {
              body.properties[titleKey] = {
                title: [
                  {
                    text: {
                      content: title
                    }
                  }
                ]
              };
            }
            body.parent.database_id = this.getNodeParameter("databaseId", i, "", {
              extractValue: true
            });
            const propertiesValues = this.getNodeParameter(
              "propertiesUi.propertyValues",
              i,
              []
            );
            if (propertiesValues.length !== 0) {
              body.properties = Object.assign(
                body.properties,
                import_GenericFunctions.mapProperties.call(this, propertiesValues, timezone, 2)
              );
            }
            const blockValues = this.getNodeParameter(
              "blockUi.blockValues",
              i,
              []
            );
            (0, import_GenericFunctions.extractDatabaseMentionRLC)(blockValues);
            body.children = (0, import_GenericFunctions.formatBlocks)(blockValues);
            const options = this.getNodeParameter("options", i);
            if (options.icon) {
              if (options.iconType && options.iconType === "file") {
                body.icon = { external: { url: options.icon } };
              } else {
                body.icon = { emoji: options.icon };
              }
            }
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "POST", "/pages", body);
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "get") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const pageId = import_GenericFunctions.getPageId.call(this, i);
            const simple = this.getNodeParameter("simple", i);
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/pages/${pageId}`);
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            download = this.getNodeParameter("options.downloadFiles", 0, false);
            const simple = this.getNodeParameter("simple", 0);
            const databaseId = this.getNodeParameter("databaseId", i, "", {
              extractValue: true
            });
            const returnAll = this.getNodeParameter("returnAll", i);
            const filterType = this.getNodeParameter("filterType", 0);
            const conditions = this.getNodeParameter("filters.conditions", i, []);
            const sort = this.getNodeParameter("options.sort.sortValue", i, []);
            const body = {
              filter: {}
            };
            if (filterType === "manual") {
              const matchType = this.getNodeParameter("matchType", 0);
              if (matchType === "anyFilter") {
                Object.assign(body.filter, {
                  or: conditions.map((data) => (0, import_GenericFunctions.mapFilters)([data], timezone))
                });
              } else if (matchType === "allFilters") {
                Object.assign(body.filter, {
                  and: conditions.map((data) => (0, import_GenericFunctions.mapFilters)([data], timezone))
                });
              }
            } else if (filterType === "json") {
              const filterJson = this.getNodeParameter("filterJson", i);
              if ((0, import_GenericFunctions.validateJSON)(filterJson) !== void 0) {
                body.filter = (0, import_n8n_workflow.jsonParse)(filterJson);
              } else {
                throw new import_n8n_workflow.NodeApiError(
                  this.getNode(),
                  {
                    message: "Filters (JSON) must be a valid json"
                  },
                  { itemIndex: i }
                );
              }
            }
            if (!Object.keys(body.filter).length) {
              delete body.filter;
            }
            if (sort) {
              body.sorts = (0, import_GenericFunctions.mapSorting)(sort);
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                `/databases/${databaseId}/query`,
                body,
                {}
              );
            } else {
              body.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.notionApiRequest.call(
                this,
                "POST",
                `/databases/${databaseId}/query`,
                body,
                qs
              );
              responseData = responseData.results;
            }
            if (download) {
              responseData = await import_GenericFunctions.downloadFiles.call(this, responseData, [
                { item: i }
              ]);
            }
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "update") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const pageId = import_GenericFunctions.getPageId.call(this, i);
            const simple = this.getNodeParameter("simple", i);
            const properties = this.getNodeParameter(
              "propertiesUi.propertyValues",
              i,
              []
            );
            const body = {
              properties: {}
            };
            if (properties.length !== 0) {
              body.properties = import_GenericFunctions.mapProperties.call(this, properties, timezone, 2);
            }
            const options = this.getNodeParameter("options", i);
            if (options.icon) {
              if (options.iconType && options.iconType === "file") {
                body.icon = { type: "external", external: { url: options.icon } };
              } else {
                body.icon = { type: "emoji", emoji: options.icon };
              }
            }
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "PATCH", `/pages/${pageId}`, body);
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
    }
    if (resource === "user") {
      if (operation === "get") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/users/${userId}`);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(this, "results", "GET", "/users");
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(this, "results", "GET", "/users");
              responseData = responseData.splice(0, qs.limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
    }
    if (resource === "page") {
      if (operation === "archive") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const pageId = import_GenericFunctions.getPageId.call(this, i);
            const simple = this.getNodeParameter("simple", i);
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "PATCH", `/pages/${pageId}`, {
              archived: true
            });
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "create") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const simple = this.getNodeParameter("simple", i);
            const body = {
              parent: {},
              properties: {}
            };
            body.parent.page_id = import_GenericFunctions.getPageId.call(this, i);
            body.properties = (0, import_GenericFunctions.formatTitle)(this.getNodeParameter("title", i));
            const blockValues = this.getNodeParameter(
              "blockUi.blockValues",
              i,
              []
            );
            (0, import_GenericFunctions.extractDatabaseMentionRLC)(blockValues);
            body.children = (0, import_GenericFunctions.formatBlocks)(blockValues);
            const options = this.getNodeParameter("options", i);
            if (options.icon) {
              if (options.iconType && options.iconType === "file") {
                body.icon = { external: { url: options.icon } };
              } else {
                body.icon = { emoji: options.icon };
              }
            }
            responseData = await import_GenericFunctions.notionApiRequest.call(this, "POST", "/pages", body);
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
      if (operation === "search") {
        for (let i = 0; i < itemsLength; i++) {
          try {
            const text = this.getNodeParameter("text", i);
            const options = this.getNodeParameter("options", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simple = this.getNodeParameter("simple", i);
            const body = {};
            if (text) {
              body.query = text;
            }
            if (options.filter) {
              const filter = options.filter?.filters || [];
              body.filter = filter;
            }
            if (options.sort) {
              const sort = options.sort?.sortValue || {};
              body.sort = sort;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                "/search",
                body
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
                this,
                "results",
                "POST",
                "/search",
                body
              );
              responseData = responseData.splice(0, qs.limit);
            }
            if (simple) {
              responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, download);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData = returnData.concat(executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({
                json: { error: error.message },
                pairedItem: { item: i }
              });
            } else {
              throw (0, import_GenericFunctions.prepareNotionError)(this.getNode(), error, i);
            }
          }
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotionV2
});
//# sourceMappingURL=NotionV2.node.js.map