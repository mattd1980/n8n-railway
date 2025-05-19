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
var Oura_node_exports = {};
__export(Oura_node_exports, {
  Oura: () => Oura
});
module.exports = __toCommonJS(Oura_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ProfileDescription = require("./ProfileDescription");
var import_SummaryDescription = require("./SummaryDescription");
class Oura {
  constructor() {
    this.description = {
      displayName: "Oura",
      name: "oura",
      icon: { light: "file:oura.svg", dark: "file:oura.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Oura API",
      defaults: {
        name: "Oura"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "ouraApi",
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
              name: "Profile",
              value: "profile"
            },
            {
              name: "Summary",
              value: "summary"
            }
          ],
          default: "summary"
        },
        ...import_ProfileDescription.profileOperations,
        ...import_SummaryDescription.summaryOperations,
        ...import_SummaryDescription.summaryFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    let responseData;
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "profile") {
          if (operation === "get") {
            responseData = await import_GenericFunctions.ouraApiRequest.call(this, "GET", "/usercollection/personal_info");
          }
        } else if (resource === "summary") {
          const qs = {};
          const { start, end } = this.getNodeParameter("filters", i);
          const returnAll = this.getNodeParameter("returnAll", 0);
          if (start) {
            qs.start_date = (0, import_moment_timezone.default)(start).format("YYYY-MM-DD");
          }
          if (end) {
            qs.end_date = (0, import_moment_timezone.default)(end).format("YYYY-MM-DD");
          }
          if (operation === "getActivity") {
            responseData = await import_GenericFunctions.ouraApiRequest.call(
              this,
              "GET",
              "/usercollection/daily_activity",
              {},
              qs
            );
            responseData = responseData.data;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.splice(0, limit);
            }
          } else if (operation === "getReadiness") {
            responseData = await import_GenericFunctions.ouraApiRequest.call(
              this,
              "GET",
              "/usercollection/daily_readiness",
              {},
              qs
            );
            responseData = responseData.data;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.splice(0, limit);
            }
          } else if (operation === "getSleep") {
            responseData = await import_GenericFunctions.ouraApiRequest.call(
              this,
              "GET",
              "/usercollection/daily_sleep",
              {},
              qs
            );
            responseData = responseData.data;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.splice(0, limit);
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
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  Oura
});
//# sourceMappingURL=Oura.node.js.map