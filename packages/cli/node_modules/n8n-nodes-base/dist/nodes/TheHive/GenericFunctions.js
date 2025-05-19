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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  buildCustomFieldSearch: () => buildCustomFieldSearch,
  mapResource: () => mapResource,
  prepareCustomFields: () => prepareCustomFields,
  prepareOptional: () => prepareOptional,
  prepareRangeQuery: () => prepareRangeQuery,
  prepareSortQuery: () => prepareSortQuery,
  splitTags: () => splitTags,
  theHiveApiRequest: () => theHiveApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_QueryFunctions = require("./QueryFunctions");
async function theHiveApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("theHiveApi");
  let options = {
    method,
    qs: query,
    uri: uri || `${credentials.url}/api${resource}`,
    body,
    rejectUnauthorized: !credentials.allowUnauthorizedCerts,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    options = Object.assign({}, options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "theHiveApi", options);
}
function mapResource(resource) {
  switch (resource) {
    case "alert":
      return "alert";
    case "case":
      return "case";
    case "observable":
      return "case_artifact";
    case "task":
      return "case_task";
    case "log":
      return "case_task_log";
    default:
      return "";
  }
}
function splitTags(tags) {
  return tags.split(",").filter((tag) => tag !== " " && tag);
}
function prepareOptional(optionals) {
  const response = {};
  for (const key in optionals) {
    if (optionals[key] !== void 0 && optionals[key] !== null && optionals[key] !== "") {
      if (["customFieldsJson", "customFieldsUi"].indexOf(key) > -1) {
        continue;
      } else if ((0, import_moment_timezone.default)(optionals[key], import_moment_timezone.default.ISO_8601).isValid()) {
        response[key] = Date.parse(optionals[key]);
      } else if (key === "artifacts") {
        try {
          response[key] = (0, import_n8n_workflow.jsonParse)(optionals[key]);
        } catch (error) {
          throw new import_n8n_workflow.ApplicationError("Invalid JSON for artifacts", { level: "warning" });
        }
      } else if (key === "tags") {
        response[key] = splitTags(optionals[key]);
      } else {
        response[key] = optionals[key];
      }
    }
  }
  return response;
}
async function prepareCustomFields(additionalFields, jsonParameters = false) {
  if (jsonParameters) {
    let customFieldsJson = additionalFields.customFieldsJson;
    delete additionalFields.customFieldsJson;
    if (typeof customFieldsJson === "string") {
      try {
        customFieldsJson = (0, import_n8n_workflow.jsonParse)(customFieldsJson);
      } catch (error) {
        throw new import_n8n_workflow.ApplicationError("Invalid JSON for customFields", { level: "warning" });
      }
    }
    if (typeof customFieldsJson === "object") {
      const customFields = Object.keys(customFieldsJson).reduce((acc, curr) => {
        acc[`customFields.${curr}`] = customFieldsJson[curr];
        return acc;
      }, {});
      return customFields;
    } else if (customFieldsJson) {
      throw new import_n8n_workflow.ApplicationError("customFieldsJson value is invalid", { level: "warning" });
    }
  } else if (additionalFields.customFieldsUi) {
    const credentials = await this.getCredentials("theHiveApi");
    const version = credentials.apiVersion;
    const endpoint = version === "v1" ? "/customField" : "/list/custom_fields";
    const requestResult = await theHiveApiRequest.call(this, "GET", endpoint);
    const hiveCustomFields = version === "v1" ? requestResult : Object.keys(requestResult).map((key) => requestResult[key]);
    const referenceTypeMapping = hiveCustomFields.reduce(
      (acc, curr) => (acc[curr.reference] = curr.type, acc),
      {}
    );
    const customFieldsUi = additionalFields.customFieldsUi;
    const customFields = (customFieldsUi?.customFields).reduce(
      (acc, curr) => {
        const fieldName = curr.field;
        const updatedField = `customFields.${fieldName}.${[referenceTypeMapping[fieldName]]}`;
        acc[updatedField] = curr.value;
        return acc;
      },
      {}
    );
    delete additionalFields.customFieldsUi;
    return customFields;
  }
  return void 0;
}
function buildCustomFieldSearch(customFields) {
  const searchQueries = [];
  Object.keys(customFields).forEach((customFieldName) => {
    searchQueries.push((0, import_QueryFunctions.Eq)(customFieldName, customFields[customFieldName]));
  });
  return searchQueries;
}
function prepareSortQuery(sort, body) {
  if (sort) {
    const field = sort.substring(1);
    const value = sort.charAt(0) === "+" ? "asc" : "desc";
    const sortOption = {};
    sortOption[field] = value;
    body.query.push({
      _name: "sort",
      _fields: [sortOption]
    });
  }
}
function prepareRangeQuery(range, body) {
  if (range && range !== "all") {
    body.query.push({
      _name: "page",
      from: parseInt(range.split("-")[0], 10),
      to: parseInt(range.split("-")[1], 10)
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildCustomFieldSearch,
  mapResource,
  prepareCustomFields,
  prepareOptional,
  prepareRangeQuery,
  prepareSortQuery,
  splitTags,
  theHiveApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map