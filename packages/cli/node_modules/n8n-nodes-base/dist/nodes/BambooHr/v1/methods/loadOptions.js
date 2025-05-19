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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getCompanyFileCategories: () => getCompanyFileCategories,
  getDepartments: () => getDepartments,
  getDivisions: () => getDivisions,
  getEmployeeDocumentCategories: () => getEmployeeDocumentCategories,
  getEmployeeFields: () => getEmployeeFields,
  getEmployeeLocations: () => getEmployeeLocations,
  getTimeOffTypeID: () => getTimeOffTypeID
});
module.exports = __toCommonJS(loadOptions_exports);
var import_transport = require("../transport");
async function getTimeOffTypeID() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "meta/time_off/types";
  const response = await import_transport.apiRequest.call(this, requestMethod, endPoint, body);
  const timeOffTypeIds = response.body.timeOffTypes;
  for (const item of timeOffTypeIds) {
    returnData.push({
      name: item.name,
      value: item.id
    });
  }
  return returnData;
}
const sort = (a, b) => {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
};
async function getCompanyFileCategories() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "files/view/";
  const response = await import_transport.apiRequest.call(this, requestMethod, endPoint, body);
  const categories = response.categories;
  for (const category of categories) {
    returnData.push({
      name: category.name,
      value: category.id
    });
  }
  returnData.sort(sort);
  return returnData;
}
async function getEmployeeDocumentCategories() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const id = this.getCurrentNodeParameter("employeeId");
  const endPoint = `employees/${id}/files/view/`;
  const response = await import_transport.apiRequest.call(this, requestMethod, endPoint, body);
  const categories = response.categories;
  for (const category of categories) {
    returnData.push({
      name: category.name,
      value: category.id
    });
  }
  returnData.sort(sort);
  return returnData;
}
async function getEmployeeLocations() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "meta/lists/";
  const fields = await import_transport.apiRequest.call(this, requestMethod, endPoint, body, {});
  const options = fields.filter((field) => field.fieldId === 18)[0].options;
  for (const option of options) {
    returnData.push({
      name: option.name,
      value: option.id
    });
  }
  returnData.sort(sort);
  return returnData;
}
async function getDepartments() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "meta/lists/";
  const fields = await import_transport.apiRequest.call(this, requestMethod, endPoint, body, {});
  const options = fields.filter((field) => field.fieldId === 4)[0].options;
  for (const option of options) {
    returnData.push({
      name: option.name,
      value: option.id
    });
  }
  returnData.sort(sort);
  return returnData;
}
async function getDivisions() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "meta/lists/";
  const fields = await import_transport.apiRequest.call(this, requestMethod, endPoint, body, {});
  const options = fields.filter((field) => field.fieldId === 1355)[0].options;
  for (const option of options) {
    returnData.push({
      name: option.name,
      value: option.id
    });
  }
  returnData.sort(sort);
  return returnData;
}
async function getEmployeeFields() {
  const returnData = [];
  const body = {};
  const requestMethod = "GET";
  const endPoint = "employees/directory";
  const { fields } = await import_transport.apiRequest.call(this, requestMethod, endPoint, body);
  for (const field of fields) {
    returnData.push({
      name: field.name || field.id,
      value: field.id
    });
  }
  returnData.sort(sort);
  returnData.unshift({
    name: "[All]",
    value: "all"
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCompanyFileCategories,
  getDepartments,
  getDivisions,
  getEmployeeDocumentCategories,
  getEmployeeFields,
  getEmployeeLocations,
  getTimeOffTypeID
});
//# sourceMappingURL=loadOptions.js.map