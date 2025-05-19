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
var NotionV1_node_exports = {};
__export(NotionV1_node_exports, {
  NotionV1: () => NotionV1
});
module.exports = __toCommonJS(NotionV1_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_VersionDescription = require("./VersionDescription");
var import_GenericFunctions = require("../shared/GenericFunctions");
var import_methods = require("../shared/methods");
class NotionV1 {
  constructor(baseDescription) {
    this.methods = {
      listSearch: import_methods.listSearch,
      loadOptions: {
        async getDatabaseProperties() {
          const returnData = [];
          const databaseId = this.getCurrentNodeParameter("databaseId", {
            extractValue: true
          });
          const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          for (const key of Object.keys(properties)) {
            if (![
              "created_time",
              "last_edited_time",
              "created_by",
              "last_edited_by",
              "formula",
              "files",
              "rollup"
            ].includes(properties[key].type)) {
              returnData.push({
                name: `${key} - (${properties[key].type})`,
                value: `${key}|${properties[key].type}`
              });
            }
          }
          returnData.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
              return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        async getFilterProperties() {
          const returnData = [];
          const databaseId = this.getCurrentNodeParameter("databaseId", {
            extractValue: true
          });
          const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          for (const key of Object.keys(properties)) {
            returnData.push({
              name: `${key} - (${properties[key].type})`,
              value: `${key}|${properties[key].type}`
            });
          }
          returnData.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
              return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        async getBlockTypes() {
          return (0, import_GenericFunctions.getBlockTypesOptions)();
        },
        async getPropertySelectValues() {
          const [name, type] = this.getCurrentNodeParameter("&key").split("|");
          const databaseId = this.getCurrentNodeParameter("databaseId", {
            extractValue: true
          });
          const resource = this.getCurrentNodeParameter("resource");
          const operation = this.getCurrentNodeParameter("operation");
          const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          if (resource === "databasePage") {
            if (["multi_select", "select"].includes(type) && operation === "getAll") {
              return properties[name][type].options.map((option) => ({
                name: option.name,
                value: option.name
              }));
            } else if (["multi_select"].includes(type) && ["create", "update"].includes(operation)) {
              return properties[name][type].options.map((option) => ({
                name: option.name,
                value: option.name
              }));
            }
          }
          return properties[name][type].options.map((option) => ({
            name: option.name,
            value: option.id
          }));
        },
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.notionApiRequestAllItems.call(this, "results", "GET", "/users");
          for (const user of users) {
            if (user.type === "person") {
              returnData.push({
                name: user.name,
                value: user.id
              });
            }
          }
          return returnData;
        },
        async getDatabaseIdFromPage() {
          const returnData = [];
          const pageId = (0, import_GenericFunctions.extractPageId)(
            this.getCurrentNodeParameter("pageId", { extractValue: true })
          );
          const {
            parent: { database_id: databaseId }
          } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/pages/${pageId}`);
          const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          for (const key of Object.keys(properties)) {
            if (![
              "created_time",
              "last_edited_time",
              "created_by",
              "last_edited_by",
              "formula",
              "files"
            ].includes(properties[key].type)) {
              returnData.push({
                name: `${key} - (${properties[key].type})`,
                value: `${key}|${properties[key].type}`
              });
            }
          }
          returnData.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
              return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        async getDatabaseOptionsFromPage() {
          const pageId = (0, import_GenericFunctions.extractPageId)(
            this.getCurrentNodeParameter("pageId", { extractValue: true })
          );
          const [name, type] = this.getCurrentNodeParameter("&key").split("|");
          const {
            parent: { database_id: databaseId }
          } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/pages/${pageId}`);
          const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          return properties[name][type].options.map((option) => ({
            name: option.name,
            value: option.id
          }));
        },
        // Get all the timezones to display them to user so that they can
        // select them easily
        async getTimezones() {
          const returnData = [];
          for (const timezone of import_moment_timezone.default.tz.names()) {
            const timezoneName = timezone;
            const timezoneId = timezone;
            returnData.push({
              name: timezoneName,
              value: timezoneId
            });
          }
          returnData.unshift({
            name: "Default",
            value: "default",
            description: "Timezone set in n8n"
          });
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...import_VersionDescription.versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const qs = {};
    const timezone = this.getTimezone();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "block") {
      if (operation === "append") {
        for (let i = 0; i < length; i++) {
          const blockId = (0, import_GenericFunctions.extractPageId)(
            this.getNodeParameter("blockId", i, "", { extractValue: true })
          );
          const blockValues = this.getNodeParameter("blockUi.blockValues", i, []);
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
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          const blockId = (0, import_GenericFunctions.extractPageId)(
            this.getNodeParameter("blockId", i, "", { extractValue: true })
          );
          const returnAll = this.getNodeParameter("returnAll", i);
          if (returnAll) {
            responseData = await import_GenericFunctions.notionApiRequestAllItems.call(
              this,
              "results",
              "GET",
              `/blocks/${blockId}/children`,
              {}
            );
          } else {
            qs.page_size = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.notionApiRequest.call(
              this,
              "GET",
              `/blocks/${blockId}/children`,
              {},
              qs
            );
            responseData = responseData.results;
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    if (resource === "database") {
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          const databaseId = (0, import_GenericFunctions.extractDatabaseId)(
            this.getNodeParameter("databaseId", i, "", { extractValue: true })
          );
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
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
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    if (resource === "databasePage") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          const simple = this.getNodeParameter("simple", i);
          const body = {
            parent: {},
            properties: {}
          };
          body.parent.database_id = this.getNodeParameter("databaseId", i, "", {
            extractValue: true
          });
          const properties = this.getNodeParameter(
            "propertiesUi.propertyValues",
            i,
            []
          );
          if (properties.length !== 0) {
            body.properties = import_GenericFunctions.mapProperties.call(this, properties, timezone);
          }
          const blockValues = this.getNodeParameter("blockUi.blockValues", i, []);
          (0, import_GenericFunctions.extractDatabaseMentionRLC)(blockValues);
          body.children = (0, import_GenericFunctions.formatBlocks)(blockValues);
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "POST", "/pages", body);
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const options = this.getNodeParameter("options", i);
          if (options.icon) {
            if (options.iconType && options.iconType === "file") {
              body.icon = { external: { url: options.icon } };
            } else {
              body.icon = { emoji: options.icon };
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          const simple = this.getNodeParameter("simple", 0);
          const databaseId = this.getNodeParameter("databaseId", i, "", {
            extractValue: true
          });
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("options.filter", i, {});
          const sort = this.getNodeParameter("options.sort.sortValue", i, []);
          const body = {
            filter: {}
          };
          if (filters.singleCondition) {
            body.filter = (0, import_GenericFunctions.mapFilters)([filters.singleCondition], timezone);
          }
          if (filters.multipleCondition) {
            const { or, and } = filters.multipleCondition.condition;
            if (Array.isArray(or) && or.length !== 0) {
              Object.assign(body.filter, {
                or: or.map((data) => (0, import_GenericFunctions.mapFilters)([data], timezone))
              });
            }
            if (Array.isArray(and) && and.length !== 0) {
              Object.assign(body.filter, {
                and: and.map((data) => (0, import_GenericFunctions.mapFilters)([data], timezone))
              });
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
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "update") {
        for (let i = 0; i < length; i++) {
          const pageId = (0, import_GenericFunctions.extractPageId)(
            this.getNodeParameter("pageId", i, "", { extractValue: true })
          );
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
            body.properties = import_GenericFunctions.mapProperties.call(this, properties, timezone);
          }
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "PATCH", `/pages/${pageId}`, body);
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    if (resource === "user") {
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          const userId = this.getNodeParameter("userId", i);
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/users/${userId}`);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
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
          returnData.push(...executionData);
        }
      }
    }
    if (resource === "page") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          const simple = this.getNodeParameter("simple", i);
          const body = {
            parent: {},
            properties: {}
          };
          body.parent.page_id = (0, import_GenericFunctions.extractPageId)(
            this.getNodeParameter("pageId", i, "", { extractValue: true })
          );
          body.properties = (0, import_GenericFunctions.formatTitle)(this.getNodeParameter("title", i));
          const blockValues = this.getNodeParameter("blockUi.blockValues", i, []);
          (0, import_GenericFunctions.extractDatabaseMentionRLC)(blockValues);
          body.children = (0, import_GenericFunctions.formatBlocks)(blockValues);
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "POST", "/pages", body);
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const options = this.getNodeParameter("options", i);
          if (options.icon) {
            if (options.iconType && options.iconType === "file") {
              body.icon = { external: { url: options.icon } };
            } else {
              body.icon = { emoji: options.icon };
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          const pageId = (0, import_GenericFunctions.extractPageId)(this.getNodeParameter("pageId", i));
          const simple = this.getNodeParameter("simple", i);
          responseData = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/pages/${pageId}`);
          if (simple) {
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "search") {
        for (let i = 0; i < length; i++) {
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
            responseData = (0, import_GenericFunctions.simplifyObjects)(responseData, false, 1);
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotionV1
});
//# sourceMappingURL=NotionV1.node.js.map