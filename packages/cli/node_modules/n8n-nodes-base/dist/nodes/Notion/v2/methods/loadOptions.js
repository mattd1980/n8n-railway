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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getBlockTypes: () => getBlockTypes,
  getDatabaseIdFromPage: () => getDatabaseIdFromPage,
  getDatabaseOptionsFromPage: () => getDatabaseOptionsFromPage,
  getDatabaseProperties: () => getDatabaseProperties,
  getFilterProperties: () => getFilterProperties,
  getPropertySelectValues: () => getPropertySelectValues,
  getTimezones: () => getTimezones,
  getUsers: () => getUsers
});
module.exports = __toCommonJS(loadOptions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_GenericFunctions = require("../../shared/GenericFunctions");
async function getDatabaseProperties() {
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
      "rollup"
    ].includes(properties[key].type)) {
      returnData.push({
        name: `${key}`,
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
}
async function getFilterProperties() {
  const returnData = [];
  const databaseId = this.getCurrentNodeParameter("databaseId", {
    extractValue: true
  });
  const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
  for (const key of Object.keys(properties)) {
    returnData.push({
      name: `${key}`,
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
}
async function getBlockTypes() {
  return (0, import_GenericFunctions.getBlockTypesOptions)();
}
async function getPropertySelectValues() {
  const [name, type] = this.getCurrentNodeParameter("&key").split("|");
  const databaseId = this.getCurrentNodeParameter("databaseId", {
    extractValue: true
  });
  const resource = this.getCurrentNodeParameter("resource");
  const operation = this.getCurrentNodeParameter("operation");
  const { properties } = await import_GenericFunctions.notionApiRequest.call(this, "GET", `/databases/${databaseId}`);
  if (resource === "databasePage") {
    if (["multi_select", "select", "status"].includes(type) && operation === "getAll") {
      return properties[name][type].options.map((option) => ({
        name: option.name,
        value: option.name
      }));
    } else if (["multi_select", "select", "status"].includes(type) && ["create", "update"].includes(operation)) {
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
}
async function getUsers() {
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
}
async function getDatabaseIdFromPage() {
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
      "rollup"
    ].includes(properties[key].type)) {
      returnData.push({
        name: `${key}`,
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
}
async function getDatabaseOptionsFromPage() {
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
    value: option.name
  }));
}
async function getTimezones() {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBlockTypes,
  getDatabaseIdFromPage,
  getDatabaseOptionsFromPage,
  getDatabaseProperties,
  getFilterProperties,
  getPropertySelectValues,
  getTimezones,
  getUsers
});
//# sourceMappingURL=loadOptions.js.map