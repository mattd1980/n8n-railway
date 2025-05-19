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
var executeResponder_operation_exports = {};
__export(executeResponder_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(executeResponder_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [{ ...import_descriptions.caseRLC, name: "id" }, import_descriptions.responderOptions];
const displayOptions = {
  show: {
    resource: ["case"],
    operation: ["executeResponder"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const caseId = this.getNodeParameter("id", i, "", { extractValue: true });
  const responderId = this.getNodeParameter("responder", i);
  let body;
  let response;
  responseData = [];
  body = {
    responderId,
    objectId: caseId,
    objectType: "case"
  };
  response = await import_transport.theHiveApiRequest.call(this, "POST", "/connector/cortex/action", body);
  body = {
    query: [
      {
        _name: "listAction"
      },
      {
        _name: "filter",
        _and: [
          {
            _field: "cortexId",
            _value: response.cortexId
          },
          {
            _field: "objectId",
            _value: response.objectId
          },
          {
            _field: "startDate",
            _value: response.startDate
          }
        ]
      }
    ]
  };
  const qs = {};
  qs.name = "log-actions";
  do {
    response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
  } while (response.status === "Waiting" || response.status === "InProgress");
  responseData = response;
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeResponder.operation.js.map