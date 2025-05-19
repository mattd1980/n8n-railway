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
var execute_exports = {};
__export(execute_exports, {
  update: () => update
});
module.exports = __toCommonJS(execute_exports);
var import_change_case = require("change-case");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../../../transport");
async function update(index) {
  let body = {};
  const requestMethod = "POST";
  const id = this.getNodeParameter("employeeId", index);
  const endpoint = `employees/${id}`;
  body = this.getNodeParameter("updateFields", index);
  const updateFields = this.getNodeParameter("updateFields", index);
  const synced = this.getNodeParameter("synced", index);
  if (synced) {
    Object.assign(body, {
      address: this.getNodeParameter("address.value", index, {})
    });
    Object.assign(body, {
      payRate: this.getNodeParameter("payRate.value", index, {})
    });
    body.firstName = this.getNodeParameter("firstName", index);
    body.lastName = this.getNodeParameter("lastName", index);
    body.department = this.getNodeParameter("department", index);
    body.dateOfBirth = this.getNodeParameter("dateOfBirth", index);
    body.division = this.getNodeParameter("division", index);
    body.employeeNumber = this.getNodeParameter("employeeNumber", index);
    body.exempt = this.getNodeParameter("exempt", index);
    body.gender = this.getNodeParameter("gender", index);
    body.hireDate = this.getNodeParameter("hireDate", index);
    body.location = this.getNodeParameter("location", index);
    body.maritalStatus = this.getNodeParameter("maritalStatus", index);
    body.mobilePhone = this.getNodeParameter("mobilePhone", index);
    body.paidPer = this.getNodeParameter("paidPer", index);
    body.payType = this.getNodeParameter("payType", index);
    body.preferredName = this.getNodeParameter("preferredName", index);
    body.ssn = this.getNodeParameter("ssn", index);
  } else {
    if (!Object.keys(updateFields).length) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "At least one fields must be updated");
    }
    Object.assign(body, {
      address: this.getNodeParameter("updateFields.address.value", index, {})
    });
    Object.assign(body, {
      payRate: this.getNodeParameter("updateFields.payRate.value", index, {})
    });
    delete updateFields.address;
    delete updateFields.payRate;
  }
  Object.assign(body, updateFields);
  if (body.gender) {
    body.gender = (0, import_change_case.capitalCase)(body.gender);
  }
  if (body.dateOfBirth) {
    body.dateOfBirth = (0, import_moment_timezone.default)(body.dateOfBirth).format("YYYY-MM-DD");
  }
  if (body.exempt) {
    body.exempt = (0, import_change_case.capitalCase)(body.exempt);
  }
  if (body.hireDate) {
    body.hireDate = (0, import_moment_timezone.default)(body.hireDate).format("YYYY-MM-DD");
  }
  if (body.maritalStatus) {
    body.maritalStatus = (0, import_change_case.capitalCase)(body.maritalStatus);
  }
  if (body.payType) {
    body.payType = (0, import_change_case.capitalCase)(body.payType);
  }
  if (body.paidPer) {
    body.paidPer = (0, import_change_case.capitalCase)(body.paidPer);
  }
  if (!Object.keys(body.payRate).length) {
    delete body.payRate;
  }
  await import_transport.apiRequest.call(this, requestMethod, endpoint, body);
  return this.helpers.returnJsonArray({ success: true });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  update
});
//# sourceMappingURL=execute.js.map